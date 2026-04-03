import { z } from "zod";

export const LLMResponseSchema = z.object({
  output: z.string().min(1, "Output cannot be empty"),
  sources: z.array(z.string()).default([]),
  ids: z.array(z.number()).default([]),
});

export type LLMResponseType = z.infer<typeof LLMResponseSchema>;
