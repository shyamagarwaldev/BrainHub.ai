import type { ContentType } from "../db/generated/prisma/client";

export interface PayloadType extends Record<string, unknown> {
  userId: string;
  contentId: string;
  chunkIndex: number;
  text: string;
  type: ContentType;
}

export type VectorDataType = {
  id: string;
  vector: number[];
  payload: PayloadType;
};
