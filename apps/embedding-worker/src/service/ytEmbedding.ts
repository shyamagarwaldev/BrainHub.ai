import { ContentSource } from "@repo/db/enums";
import type { Content } from "@repo/db/types";

export async function ytEmbeddingProcess(
  chunks: string[],
  embeddings: number[][],
  content: Content,
) {
  return chunks.map((chunk, i) => {
    return {
      id: crypto.randomUUID(),
      properties: {
        chunkIndex: i,
        userId: content.userId,
        contentId: content.id,
        text: chunk,
        contentSource: ContentSource.YOUTUBE,
        url: content.url,
        title: content.title,
      },
      vector: embeddings[i]!,
    };
  });
}
