import { COLLECTION_NAME } from "@repo/shared/constants";
import { db_init, w_client } from "../client";
import type { WeaviatePayloadType } from "../types/weaviate";
import type { PayloadType } from "@repo/shared/types";
export async function hybridSearch(
  query: string,
  queryVector: number[],
  userId: string,
) {
  await db_init();
  const collection =
    w_client.collections.get<WeaviatePayloadType>(COLLECTION_NAME);
  const [bm25Result, semanticResult] = await Promise.all([
    collection.query.bm25(query, {
      limit: 20,
      queryProperties: ["text^2", "title"],
      filters: collection.filter.byProperty("userId").equal(userId),
    }),
    collection.query.nearVector(queryVector, {
      limit: 20,
      filters: collection.filter.byProperty("userId").equal(userId),
    }),
  ]);
  const hybridObject = new Map<
    string,
    { id: string; score: number; properties: WeaviatePayloadType }
  >();
  const bm25Object = bm25Result.objects;
  for (let i = 0; i < bm25Object.length; i++) {
    const rank = i + 1;
    const score =
      (hybridObject.get(bm25Object[i]!.uuid)?.score ?? 0) + 1 / (60 + rank);
    hybridObject.set(bm25Object[i]!.uuid, {
      id: bm25Object[i]!.uuid,
      score,
      properties: bm25Object[i]?.properties as WeaviatePayloadType,
    });
  }
  const semanticObject = semanticResult.objects;
  for (let i = 0; i < semanticObject.length; i++) {
    const rank = i + 1;
    const score =
      (hybridObject.get(semanticObject[i]!.uuid)?.score ?? 0) + 1 / (60 + rank);
    hybridObject.set(semanticObject[i]!.uuid, {
      id: semanticObject[i]!.uuid,
      score,
      properties: semanticObject[i]?.properties as WeaviatePayloadType,
    });
  }
  return Array.from(hybridObject.entries())
    .sort(([, a], [, b]) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 10);
}

export async function topKVectors(
  query: string,
  queryVector: number[],
  userId: string,
  K: number,
) {
  await db_init();
  const collection =
    w_client.collections.get<WeaviatePayloadType>(COLLECTION_NAME);
  const hybridResult = await collection.query.hybrid(query, {
    vector: queryVector,
    limit: 10,
    filters: collection.filter.byProperty("userId").equal(userId),
    queryProperties: ["title", "text^2"],
    rerank: {
      property: "text",
      query,
    },
    returnMetadata: ["score"],
  });
  return hybridResult.objects.slice(0, K).map((obj) => {
    return {
      id: obj.uuid,
      score: obj.metadata?.score! ?? -1,
      payload: obj.properties as unknown as PayloadType,
    };
  });
}
