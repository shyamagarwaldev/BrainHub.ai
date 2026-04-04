import { z } from "zod";
import { ContentType } from "../db/generated/prisma/client";

export const ContentTypeSchema = z.enum(
  ContentType,
  "Content type must be YOUTUBE, TWITTER, ARTICLES, or NOTE.",
);

export const AddContentSchema = z.object({
  title: z.string(),
  rawContent: z.string().optional(),
  type: ContentTypeSchema,
  url: z.url("Enter a valid URL.").optional(),
});

export type AddContentSchemaType = z.infer<typeof AddContentSchema>;
