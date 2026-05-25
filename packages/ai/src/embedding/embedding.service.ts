import { ai_client } from "../client.ts";

export async function getEmbeddings(chunks: string[]): Promise<number[][]> {
  try {
    if (!chunks || chunks.length === 0)
      throw new Error("No chunks provided for embeddings");

    const model = process.env.EMBEDDING_MODEL;
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
    console.error("Embeddings failed:", error?.message || error);
    throw new Error("Embedding Service Failed");
  }
}

export async function getEmbedding(chunks: string[]) {
  const all_chunks = await getEmbeddings(chunks);

  if (!all_chunks || all_chunks.length === 0) {
    throw new Error("No embedding returned");
  }

  return all_chunks[0];
}
