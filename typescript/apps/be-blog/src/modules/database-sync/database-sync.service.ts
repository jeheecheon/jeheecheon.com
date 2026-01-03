import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { safely, safelyAsync } from "@packages/common/utils/safely";
import { HOUR } from "@packages/common/utils/time";
import { existsSync, readFileSync, unlinkSync } from "fs";
import { copyFile } from "fs/promises";
import { dirname, join } from "path";
import { configs } from "../../utils/config.js";
import { listObjects, putObject, removeObject } from "../../utils/s3.js";
import { getLatestBackup } from "./database-sync.utils.js";

@Injectable()
export class DatabaseSyncService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSyncService.name);
  private readonly dataDir = dirname(configs.DATABASE_PATH);

  onModuleInit() {
    const runBackup = () => this.backup().catch(this.logger.error);
    runBackup();
    setInterval(runBackup, HOUR);
  }

  private async backup(): Promise<void> {
    const shouldBackup = await safelyAsync(() => this.shouldBackup());
    if (!shouldBackup) {
      return;
    }

    const copyPath = join(this.dataDir, `temp-${Date.now()}.sqlite`);

    try {
      await copyFile(configs.DATABASE_PATH, copyPath);
      await putObject({
        key: `${configs.BACKUP_S3_PREFIX}/blog-${Date.now()}.sqlite`,
        body: readFileSync(copyPath),
      });
      await this.deleteExpiredBackups();

      this.logger.log(`Backup complete`);
    } finally {
      safely(() => unlinkSync(copyPath));
    }
  }

  private async shouldBackup(): Promise<boolean> {
    if (!existsSync(configs.DATABASE_PATH)) {
      return false;
    }

    const latestBackup = await getLatestBackup();
    if (!latestBackup?.LastModified) {
      return true;
    }

    const hoursSinceLastBackup =
      (Date.now() - latestBackup.LastModified.getTime()) / HOUR;
    return hoursSinceLastBackup >= configs.BACKUP_INTERVAL_HOURS;
  }

  private async deleteExpiredBackups(): Promise<void> {
    try {
      const backups = await listObjects(configs.BACKUP_S3_PREFIX);

      const retentionCutoff = new Date(
        Date.now() - configs.BACKUP_RETENTION_DAYS,
      );

      const expiredBackups = backups.filter(
        ({ Key, LastModified }) =>
          Key && LastModified && LastModified < retentionCutoff,
      );

      await Promise.all(expiredBackups.map(({ Key }) => removeObject(Key!)));
    } catch (err) {
      this.logger.warn("Failed to delete expired backups", err);
    }
  }
}
