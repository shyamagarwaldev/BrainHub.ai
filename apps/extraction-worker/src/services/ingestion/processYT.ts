import { ContentSource } from "@repo/db/enums";
import { getYTTranscript } from "@repo/ai/extraction";
import type { Content } from "@repo/db/types";
import { chunking } from "@repo/ai/chunking";
import { getEmbeddings } from "@repo/ai/embedding";
export async function processYT(content: Content) {
  const docs = await getYTTranscript(content.url!);
  const chunks: string[] = chunking(docs as any);
  const embeddings: number[][] = await getEmbeddings(chunks);
  const data = chunks.map((chunk, i) => {
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
  return data;
}
