import { EMBEDDING_MODEL } from "@repo/shared/constants";
import { ai_client } from "../client.ts";

export async function getEmbeddings(chunks: string[]): Promise<number[][]> {
  try {
    if (!chunks || chunks.length === 0)
      throw new Error("No chunks provided for embeddings");

    const model = EMBEDDING_MODEL.MODEL_1;
    if (!model) {
      throw new Error("EMBEDDING_MODEL not set");
    }

    const result = await ai_client.embeddings.create({
      input: chunks,
      model,
    });
    if (!result || !result.data || !Array.isArray(result.data)) {
      console.error("Invalid embedding response:", result);
      throw new Error("Invalid embedding response");
    }
    const embeddings = result.data.map((r) => r.embedding);
    return embeddings;
  } catch (error: any) {
    let message = error instanceof Error ? error.message : String(error);
    console.error(`Embedding Service Failed with Error: ${message}`);
    throw new Error(`Embedding Service Failed with Error: ${message}`);
  }
}

export async function getEmbedding(chunks: string[]) {
  const all_chunks = await getEmbeddings(chunks);
  if (!all_chunks || all_chunks.length === 0) {
    throw new Error("No embedding returned");
  }
  return all_chunks[0];
}
