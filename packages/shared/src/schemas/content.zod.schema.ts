import { z } from "zod";
import { ContentSource } from "@repo/db/enums";

export const ContentSourceSchema = z.enum(
  ContentSource,
  "Content type must be YOUTUBE, TWITTER, ARTICLES, or NOTE.",
);

export const AddContentSchema = z.object({
  title: z.string(),
  rawContent: z.string().optional(),
  source: ContentSourceSchema,
  url: z.url("Enter a valid URL.").optional(),
});

export type AddContentSchemaType = z.infer<typeof AddContentSchema>;
