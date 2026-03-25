import { qdrant_client } from "../db/qdrant";
import type { InsertStatusType, VectorDataType } from "../types";

const COLLECTION_NAME = process.env.COLLECTION_NAME ?? "";

export async function createCollection(embeddings: number[][]) {
  await qdrant_client.createCollection(COLLECTION_NAME, {
    vectors: {
      size: 1536,
      distance: "Cosine",
    },
  });
}

export async function insertEmbeddings(
  data: VectorDataType[],
): Promise<InsertStatusType> {
  try {
    const response = await qdrant_client.upsert(COLLECTION_NAME, {
      wait: true,
      points: data,
    });
    return response.status;
  } catch (error) {
    console.error(`Inserting Embeddings Failed With Error : ${error}`);
    throw new Error("Embedding Service Failed During Insert Operation");
  }
}

export async function searchEmbeddings(
  vector: number[],
  userId: string,
  top_k: number = 3,
) {
  const chunks = await qdrant_client.search(COLLECTION_NAME, {
    vector,
    limit: top_k,
    filter: {
      must: [
        {
          key: "userId",
          match: { value: userId },
        },
      ],
    },
  });
  return chunks.map((r) => {
    return {
      score: r.score,
      text: r.payload?.userId as string,
      contentId: r.payload?.contentId as string,
      chunkId: r.payload?.chunkId as string,
      type: r.payload?.type as string,
    };
  });
}
