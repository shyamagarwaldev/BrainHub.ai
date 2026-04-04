// import { qdrant_client } from "../db/qdrant";
import type { PayloadType, VectorDataType } from "../types";

// const COLLECTION_NAME = process.env.COLLECTION_NAME ?? "";

// export async function ensureCollectionExists(vectorSize?: number) {
//   try {
//     await qdrant_client.getCollection(COLLECTION_NAME);
//   } catch {
//     await qdrant_client.createCollection(COLLECTION_NAME, {
//       vectors: {
//         size: vectorSize ?? 384,
//         distance: "Cosine",
//       },
//       sparse_vectors: {
//         text: {},
//       },
//     });
//   }
// }

// export async function createCollection(embeddings: number[][]) {
//   const vectorSize = embeddings?.[0]?.length ?? 1536;
//   await ensureCollectionExists(vectorSize);
// }

// export async function insertEmbeddings(
//   data: VectorDataType[],
// ): Promise<InsertStatusType> {
//   try {
//     const vectorSize = data?.[0]?.vector?.length ?? 1536;
//     await ensureCollectionExists(vectorSize);
//     const response = await qdrant_client.upsert(COLLECTION_NAME, {
//       wait: true,
//       points: data,
//     });
//     return response.status;
//   } catch (error) {
//     console.error(`Inserting Embeddings Failed With Error : ${error}`);
//     throw new Error("Embedding Service Failed During Insert Operation");
//   }
// }
async function pythonSearch(query: string, userId: string, top_k: number) {
  const res = await fetch(process.env.RETRIEVAL_URL + "/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      userId: userId,
      limit: top_k,
    }),
  });

  if (!res.ok) throw new Error("Python search failed");

  return res.json();
}
export async function hybridSearch(
  query: string,
  userId: string,
  top_k: number = 3,
) {
  // const chunks = await qdrant_client.search(COLLECTION_NAME, {
  //   vector,
  //   limit: top_k,
  //   filter: {
  //     must: [
  //       {
  //         key: "userId",
  //         match: { value: userId },
  //       },
  //     ],
  //   },
  // });
  const chunks = (await pythonSearch(query, userId, top_k)) as {
    id: string;
    score: number;
    payload: PayloadType;
  }[];
  console.log(chunks);

  return chunks.map((r) => {
    return {
      score: r.score,
      payload: r.payload,
      id: r.id as string,
    };
  });
}

async function storeInPython(
  vectorData: Pick<VectorDataType, "id" | "payload">[],
) {
  const res = await fetch(process.env.RETRIEVAL_URL + "/embed-store", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: vectorData.map((v) => v.id),
      texts: vectorData.map((v) => v.payload.text),
      payloads: vectorData.map((v) => v.payload),
    }),
  });

  if (!res.ok) throw new Error("Python embed-store failed");

  return res.json();
}

export async function storeChunks(
  vectorData: Pick<VectorDataType, "id" | "payload">[],
) {
  await storeInPython(vectorData);
}
