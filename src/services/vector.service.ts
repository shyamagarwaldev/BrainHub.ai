import { qdrant_client } from "../db/qdrant";
import type { InsertStatusType, VectorDataType } from "../types";

const COLLECTION_NAME = process.env.COLLECTION_NAME ?? "";

async function ensureCollectionExists(vectorSize: number) {
  if (!COLLECTION_NAME) {
    throw new Error("COLLECTION_NAME env var is required");
  }

  try {
    await qdrant_client.getCollection(COLLECTION_NAME);
    return;
  } catch (err: any) {
    const status =
      typeof err?.status === "number"
        ? err.status
        : typeof err?.response?.status === "number"
          ? err.response.status
          : undefined;

    // If it's not a "missing collection" error, rethrow.
    if (status && status !== 404) throw err;
    if (!status) {
      const msg = String(err?.message ?? err);
      if (!/not found|does not exist|404/i.test(msg)) throw err;
    }
  }

  await qdrant_client.createCollection(COLLECTION_NAME, {
    vectors: {
      size: vectorSize,
      distance: "Cosine",
    },
  });
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
      text: r.payload?.text as string,
      contentId: r.payload?.contentId as string,
      chunkId: r.payload?.chunkIndex as unknown as string,
      type: r.payload?.type as string,
      id: r.id,
    };
  });
}
