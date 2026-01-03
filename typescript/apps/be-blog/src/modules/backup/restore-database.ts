import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from "fs";
import { dirname } from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { configs } from "../../utils/config.js";

const s3 = new S3Client({
  region: configs.AWS_REGION,
  credentials: {
    accessKeyId: configs.AWS_ACCESS_KEY_ID,
    secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
  },
});

export async function restoreDatabaseIfMissing(): Promise<void> {
  const dataDir = dirname(configs.DATABASE_PATH);

  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (existsSync(configs.DATABASE_PATH)) {
    console.log("[Database] Local database found");
    return;
  }

  try {
    const latestBackup = await findLatestBackup();
    if (!latestBackup) {
      console.log("[Database] No backup found, starting fresh");
      return;
    }

    console.log(`[Database] Restoring from ${latestBackup}...`);
    await downloadFromS3(latestBackup, configs.DATABASE_PATH);
    console.log("[Database] Restore complete");
  } catch (err) {
    console.error("[Database] Restore failed:", err);
    console.log("[Database] Starting fresh due to restore failure");
  }
}

async function findLatestBackup(): Promise<string | null> {
  const { Contents: objects = [] } = await s3.send(
    new ListObjectsV2Command({
      Bucket: configs.AWS_S3_BUCKET,
      Prefix: configs.BACKUP_S3_PREFIX,
    }),
  );

  if (objects.length === 0) {
    return null;
  }

  const sorted = objects
    .filter((obj) => obj.Key && obj.LastModified)
    .sort((a, b) => {
      const aTime = a.LastModified?.getTime?.() ?? 0;
      const bTime = b.LastModified?.getTime?.() ?? 0;

      return bTime - aTime;
    });

  return sorted[0]?.Key ?? null;
}

async function downloadFromS3(s3Key: string, destPath: string): Promise<void> {
  const tempPath = `${destPath}.tmp`;

  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: configs.AWS_S3_BUCKET,
        Key: s3Key,
      }),
    );

    if (!response.Body) {
      throw new Error(`Empty response body for ${s3Key}`);
    }

    const writeStream = createWriteStream(tempPath);
    await pipeline(response.Body as Readable, writeStream);

    const { renameSync } = await import("fs");
    renameSync(tempPath, destPath);
  } catch (err) {
    if (existsSync(tempPath)) {
      unlinkSync(tempPath);
    }
    throw err;
  }
}
