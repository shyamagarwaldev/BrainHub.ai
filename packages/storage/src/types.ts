import type { PutObjectCommandOutput } from "@aws-sdk/client-s3";
import type { ContentSource } from "@repo/db/enums";
export type S3UploadReturnType = {
  output: PutObjectCommandOutput;
  key: string;
};

export type CleanedDataType = {
  id: string;
  metadata: {
    createdAt: string;
    source: ContentSource;
    language?: string;
    creator?: string;
  };
  content: string;
};
export type RawDataType = {
  id: string;
  metadata: {
    createdAt: string;
    source: ContentSource;
    language?: string;
    creator?: string;
  };
  payload: any;
};
