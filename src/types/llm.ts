import type { MetaDataType } from "./";

export type { LLMResponseType } from "../schemas/llmResponse.zod.schema";

export type InsertStatusType = "acknowledged" | "completed" | "wait_timeout";

export type ContextType = {
  metadata: MetaDataType;
  text: string;
  id: string;
}[];
