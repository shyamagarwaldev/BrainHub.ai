import { PutObjectCommand } from "@aws-sdk/client-s3";
import client from "./s3.client";
import { Key } from "./keys";
import type { CleanedDataType, RawDataType } from "./types";

type JsonBody = Record<string, unknown>;

async function upload<T>(s3Key: string, body: T) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: s3Key,
    Body: JSON.stringify(body),
    ContentType: "application/json",
  });

  return client.send(command);
}

export async function uploadRawText(
  userId: string,
  contentId: string,
  body: RawDataType,
) {
  const key = Key.raw(userId, contentId);
  return { output: await upload(key, body), key };
}

export async function uploadCleanedText(
  userId: string,
  contentId: string,
  body: CleanedDataType,
) {
  const key = Key.cleaned(userId, contentId);
  return { output: await upload(key, body), key };
}
