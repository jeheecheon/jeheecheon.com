import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Nullable } from "@packages/common/types/misc";
import { safely, safelyAsync } from "@packages/common/utils/safely";
import { HOUR } from "@packages/common/utils/time";
import { existsSync, readFileSync, unlinkSync } from "fs";
import { copyFile } from "fs/promises";
import { dirname, join } from "path";
import { configs } from "../../utils/config.js";

@Injectable()
export class DatabaseBackupService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseBackupService.name);
  private readonly s3 = new S3Client({
    region: configs.AWS_REGION,
    credentials: {
      accessKeyId: configs.AWS_ACCESS_KEY_ID,
      secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
    },
  });

  private readonly dataDir = dirname(configs.DATABASE_PATH);
  private isRunning = false;

  onModuleInit() {
    const runBackup = () => this.backup().catch(this.logger.error);
    runBackup();
    setInterval(runBackup, HOUR);
  }

  private async backup(): Promise<void> {
    const shouldBackup = await safelyAsync(() => this.shouldBackup());
    if (!shouldBackup || this.isRunning) {
      return;
    }

    this.isRunning = true;
    let tempFilePath: Nullable<string> = null;

    try {
      tempFilePath = await this.createTempCopy();
      const s3Key = await this.uploadToS3(tempFilePath);
      tempFilePath = null;

      await this.deleteExpiredBackups();
      this.logger.log(`Backup complete: ${s3Key}`);
    } finally {
      const shouldDelete = tempFilePath && existsSync(tempFilePath);
      if (shouldDelete) {
        safely(() => unlinkSync(tempFilePath!));
      }
      this.isRunning = false;
    }
  }

  private async shouldBackup(): Promise<boolean> {
    if (!existsSync(configs.DATABASE_PATH)) {
      return false;
    }

    const lastBackupDate = await this.getLastBackupDate();
    if (!lastBackupDate) {
      return true;
    }

    const hoursSinceLastBackup = (Date.now() - lastBackupDate.getTime()) / HOUR;
    return hoursSinceLastBackup >= configs.BACKUP_INTERVAL_HOURS;
  }

  private async getLastBackupDate(): Promise<Nullable<Date>> {
    const objects = await this.listBackups();
    const sorted = objects
      .filter((obj) => obj.LastModified)
      .sort((a, b) => b.LastModified!.getTime() - a.LastModified!.getTime());

    return sorted[0]?.LastModified ?? null;
  }

  private async createTempCopy(): Promise<string> {
    const tempPath = join(this.dataDir, `temp-${Date.now()}.sqlite`);
    await copyFile(configs.DATABASE_PATH, tempPath);
    return tempPath;
  }

  private async uploadToS3(localPath: string): Promise<string> {
    const s3Key = `${configs.BACKUP_S3_PREFIX}/blog-${Date.now()}.sqlite`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: configs.AWS_S3_BUCKET,
        Key: s3Key,
        Body: readFileSync(localPath),
      }),
    );

    unlinkSync(localPath);
    return s3Key;
  }

  private async deleteExpiredBackups(): Promise<void> {
    try {
      const backups = await this.listBackups();

      const retentionCutoff = new Date();
      retentionCutoff.setDate(
        retentionCutoff.getDate() - configs.BACKUP_RETENTION_DAYS,
      );

      const expiredBackups = backups.filter(
        ({ Key, LastModified }) =>
          Key && LastModified && LastModified < retentionCutoff,
      );

      await Promise.all(
        expiredBackups.map(({ Key }) =>
          this.s3.send(
            new DeleteObjectCommand({
              Bucket: configs.AWS_S3_BUCKET,
              Key: Key!,
            }),
          ),
        ),
      );
    } catch (err) {
      this.logger.warn("Failed to delete expired backups", err);
    }
  }

  private async listBackups() {
    try {
      const response = await this.s3.send(
        new ListObjectsV2Command({
          Bucket: configs.AWS_S3_BUCKET,
          Prefix: configs.BACKUP_S3_PREFIX,
        }),
      );
      return response.Contents ?? [];
    } catch (err) {
      this.logger.warn("Failed to list backups", err);
      return [];
    }
  }
}
