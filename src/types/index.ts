import { ContentType } from "../db/generated/prisma/enums";

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

export type InsertStatusType = "acknowledged" | "completed" | "wait_timeout";
export type ContextType = { type: string; text: string }[];
