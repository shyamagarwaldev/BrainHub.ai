import { qdrant_client } from "../db/qdrant";
import type { InsertStatusType, PayloadType, VectorDataType } from "../types";

const COLLECTION_NAME = process.env.COLLECTION_NAME ?? "";

async function ensureCollectionExists(vectorSize: number) {
  try {
    await qdrant_client.getCollection(COLLECTION_NAME);
  } catch {
    await qdrant_client.createCollection(COLLECTION_NAME, {
      vectors: {
        size: vectorSize,
        distance: "Cosine",
      },
    });
  }
}

export async function createCollection(embeddings: number[][]) {
  const vectorSize = embeddings?.[0]?.length ?? 1536;
  await ensureCollectionExists(vectorSize);
}

export async function insertEmbeddings(
  data: VectorDataType[],
): Promise<InsertStatusType> {
  try {
    const vectorSize = data?.[0]?.vector?.length ?? 1536;
    await ensureCollectionExists(vectorSize);
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
  await ensureCollectionExists(vector?.length ?? 1536);
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
      payload: r.payload as PayloadType,
      id: r.id as string,
    };
  });
}
