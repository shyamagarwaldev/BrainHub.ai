import { COLLECTION_NAME } from "@repo/shared/constants";
import w_client from "../client";
import { db_init } from "../store";
import type { IWeaviatePayload } from "../types/weaviate";
import type { PayloadType } from "@repo/shared/types";

export async function getTopKVectors(
  query: string,
  queryVector: number[],
  K: number,
  userId: string,
) {
  await db_init();
  const collection =
    w_client.collections.get<IWeaviatePayload>(COLLECTION_NAME);
  // const [bm25Result, semanticResult] = await Promise.all([
  //   collection.query.bm25(query, {
  //     limit: 20,
  //     returnMetadata: ["score"],
  //   }),
  //   collection.query.nearVector(queryVector),
  // ]);

  // reranker and cross-encoding
  // return top k verctors
  // return { ...bm25Result.objects, ...semanticResult.objects };
}
