import type { PayloadType } from "@repo/shared/types";
import axios from "axios";

export async function reranker(
  query: string,
  hybridResult: [
    string,
    { id: string; score: number; properties: PayloadType },
  ][],
  K: number,
): Promise<{ id: string; score: number; payload: PayloadType }[]> {
  const hashMap = new Map<number, { id: string; properties: PayloadType }>();
  const texts = hybridResult.map(([_, { score, properties, id }], i) => {
    hashMap.set(i, { id, properties });
    return properties.text;
  });

  const { data } = await axios.post<{ score: number; index: number }[]>(
    `${process.env.RERANKER_URL ?? "http://localhost:8090"}` + "/rerank",
    {
      query,
      texts,
      raw_scores: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return data
    .map(({ score, index }) => ({
      id: hashMap.get(index)?.id!,
      score,
      payload: hashMap.get(index)?.properties!,
    }))
    .filter(Boolean)
    .slice(0, K);
}
