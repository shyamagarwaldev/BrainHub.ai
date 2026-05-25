import type { PayloadType } from "@repo/shared/types";
import { getEmbedding } from "../embedding/embedding.service";
import { getTopKVectors } from "@repo/vector/search";

export async function hybridSearch(
  query: string,
  userId: string,
  limit: number,
) {
  const queryVector = await getEmbedding([query]);
  if (!queryVector) throw new Error("No Query Vector Generated");
  const topKVectors = await getTopKVectors(query, queryVector, limit, userId);
  return topKVectors;
}
