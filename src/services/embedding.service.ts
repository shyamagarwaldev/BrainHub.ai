import { ai_client } from "../app";

export async function embedChunks(chunks: string[]): Promise<number[][]> {
  try {
    const result = await ai_client.embeddings.create({
      input: chunks,
      model: process.env.EMBEDDING_MODEL ?? "",
    });
    //   console.log(result.data);
    const embeddings = result.data.map((r) => r.embedding);
    return embeddings;
  } catch (error) {
    console.error(`Embeddings failed ${error}`);
    throw new Error("Embedding Service Failed");
  }
}
