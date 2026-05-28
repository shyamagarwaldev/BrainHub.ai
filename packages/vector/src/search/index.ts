import { COLLECTION_NAME } from "@repo/shared/constants";
import w_client from "../client";
import { db_init } from "../store";
import type { WeaviatePayloadType } from "../types/weaviate";

export async function getVectors(
  query: string,
  queryVector: number[],
  K: number,
  userId: string,
) {
  await db_init();
  const collection =
    w_client.collections.get<WeaviatePayloadType>(COLLECTION_NAME);
  // const [bm25Result, semanticResult] = await Promise.all([
  //   collection.query.bm25(query, {
  //     limit: 20,
  //     returnMetadata: ["score"],
  //   }),
  //   collection.query.nearVector(queryVector),
  // ]);
  // const bm25Object = bm25Result.objects.map((obj) => {
  //   if (obj.properties) {
  //     const properties = obj.properties as WeaviatePayloadType;
  //     if (properties.userId == userId) {
  //       return {
  //         id: obj.uuid,
  //         vector: obj.vectors,
  //         score: obj.metadata?.score,
  //         payload: properties,
  //       };
  //     }
  //   }
  // });
  // const semanticObject = semanticResult.objects.map((obj) => {
  //   if (obj.properties) {
  //     const properties = obj.properties as WeaviatePayloadType;
  //     if (properties.userId == userId) {
  //       return {
  //         id: obj.uuid,
  //         vector: obj.vectors,
  //         score: obj.metadata?.score,
  //         payload: properties,
  //       };
  //     }
  //   }
  // });
}
