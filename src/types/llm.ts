export type LLMResponseType = {
  output: string;
  sources: string[];
};
export type InsertStatusType = "acknowledged" | "completed" | "wait_timeout";

export type ContextType = { type: string; text: string }[];
