import { z } from "zod";

export const BrainQuerySchema = z.object({
  query: z
    .string("Question must be a string.")
    .trim()
    .min(1, "Enter a question or prompt."),
  conversationId: z.uuid("Conversation id must be a valid UUID.").optional(),
});

export type BrainQuerySchemaType = z.infer<typeof BrainQuerySchema>;
