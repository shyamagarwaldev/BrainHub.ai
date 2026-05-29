import { ContentSource } from "@repo/db/enums";
import type { ContextType, PayloadType } from "@repo/shared/types";

export function generateCleanChunks(
  chunks: {
    score: number;
    payload: PayloadType;
    id: string;
  }[],
): ContextType {
  return chunks.map((c) => {
    switch (c.payload.contentSource) {
      case ContentSource.X:
        return {
          text: c.payload.text,
          id: c.id,
          metadata: {
            contentSource: c.payload.contentSource,
            title: c.payload.title,
            url: c.payload.url,
            creator: c.payload.creator,
          },
        };
      case ContentSource.YOUTUBE:
        return {
          text: c.payload.text,
          id: c.id,
          metadata: {
            contentSource: c.payload.contentSource,
            title: c.payload.title,
            url: c.payload.url,
          },
        };
      default:
        throw new Error(
          "invalid content type: failed at generate clean chunk funtion",
        );
    }
  });
}
