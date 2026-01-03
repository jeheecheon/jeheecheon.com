import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { safely } from "@packages/common/utils/safely";
import { createWriteStream, renameSync, unlinkSync } from "fs";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { configs } from "./config.js";

const s3 = new S3Client({
  region: configs.AWS_REGION,
  credentials: {
    accessKeyId: configs.AWS_ACCESS_KEY_ID,
    secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
  },
});

export async function listObjects(prefix: string) {
  const response = await s3.send(
    new ListObjectsV2Command({
      Bucket: configs.AWS_S3_BUCKET,
      Prefix: prefix,
    }),
  );

  return response.Contents ?? [];
}

export async function getObject(key: string) {
  return s3.send(
    new GetObjectCommand({
      Bucket: configs.AWS_S3_BUCKET,
      Key: key,
    }),
  );
}

export async function putObject({
  key,
  body,
  contentType,
}: {
  key: string;
  body: Buffer | string;
  contentType?: string;
}) {
  return s3.send(
    new PutObjectCommand({
      Bucket: configs.AWS_S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

export async function removeObject(key: string) {
  return s3.send(
    new DeleteObjectCommand({
      Bucket: configs.AWS_S3_BUCKET,
      Key: key,
    }),
  );
}

export async function downloadObject(
  key: string,
  destPath: string,
): Promise<void> {
  const tempPath = `${destPath}.tmp`;

  try {
    const response = await getObject(key);

    if (!response.Body) {
      throw new Error(`Empty response body for ${key}`);
    }

    const writeStream = createWriteStream(tempPath);
    await pipeline(response.Body as Readable, writeStream);
    renameSync(tempPath, destPath);
  } catch (err) {
    safely(() => unlinkSync(tempPath));
    throw err;
  }
}
