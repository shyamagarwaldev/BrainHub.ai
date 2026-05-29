import { embeddingQueue } from "./embeddingQueue";

export async function addToEmbeddingQueue(
  name: string,
  data: Record<string, unknown>,
) {
  return embeddingQueue.add(name, data);
}
