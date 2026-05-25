import { chunking } from "@repo/ai/chunking";
import { getEmbeddings } from "@repo/ai/embedding";
import { getTwitterThread } from "@repo/ai/extraction";
import { ContentSource } from "@repo/db/enums";
import type { Content } from "@repo/db/types";

export async function processX(content: Content) {
  const res = await getTwitterThread(content.url!);
  const thread = res.thread
    .map((t) => {
      return t.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    })
    .join("\n\n");
  const chunks: string[] = chunking(thread);
  const embeddings = await getEmbeddings(chunks);
  const data = chunks.map((chunk, i) => {
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
        author: res.author,
      },
      vector: embeddings[i]!,
    };
  });
  return data;
}
