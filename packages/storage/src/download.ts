import { GetObjectCommand } from "@aws-sdk/client-s3";
import client from "./s3.client";
import { Key } from "./keys";
import type { CleanedDataType, RawDataType } from "./types";

async function download<T>(s3Key: string): Promise<T> {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: s3Key,
  });

  const response = await client.send(command);
  if (!response.Body) {
    throw new Error("S3 object body is empty");
  }

  const bodyString = await response.Body.transformToString();

  return JSON.parse(bodyString);
}

export async function downloadRawText(s3Key: string) {
  return download<RawDataType>(s3Key);
}

export async function downloadCleanedText(s3Key: string) {
  return download<CleanedDataType>(s3Key);
}
