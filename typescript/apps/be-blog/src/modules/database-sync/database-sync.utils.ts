import { _Object } from "@aws-sdk/client-s3";
import { Nullable } from "@packages/common/types/misc";
import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { configs } from "../../utils/config.js";
import { downloadObject, listObjects } from "../../utils/s3.js";

export async function getLatestBackup(): Promise<Nullable<_Object>> {
  const backups = await listObjects(configs.BACKUP_S3_PREFIX);

  const sorted = backups
    .filter((obj) => obj.Key && obj.LastModified)
    .sort((a, b) => {
      const aTime = a.LastModified?.getTime?.() ?? 0;
      const bTime = b.LastModified?.getTime?.() ?? 0;
      return bTime - aTime;
    });

  return sorted[0] ?? null;
}

export async function restore(): Promise<void> {
  const dataDir = dirname(configs.DATABASE_PATH);

  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  if (existsSync(configs.DATABASE_PATH)) {
    console.log("[Database] Local database found");
    return;
  }

  try {
    const latestBackup = await getLatestBackup();

    if (!latestBackup?.Key) {
      console.log("[Database] No backup found, starting fresh");
      return;
    }

    await downloadObject(latestBackup.Key, configs.DATABASE_PATH);
    console.log("[Database] Restore complete");
  } catch (err) {
    console.error("[Database] Restore failed:", err);
  }
}
