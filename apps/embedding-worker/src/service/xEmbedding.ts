import { ContentSource } from "@repo/db/enums";
import type { Content } from "@repo/db/types";

export async function xEmbeddingProcess(
  chunks: string[],
  embeddings: number[][],
  content: Content,
) {
  return chunks.map((chunk, i) => {
    return {
      id: crypto.randomUUID(),
      properties: {
        userId: content.userId,
        contentId: content.id,
        chunkIndex: i,
        text: chunk,
        contentSource: ContentSource.X,
        url: content.url,
        title: content.title,
        creator: content.creator,
      },
      vector: embeddings[i]!,
    };
  });
}
