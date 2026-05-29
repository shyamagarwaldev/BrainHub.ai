import { generateCleanChunks } from "./cleanChunks";
import { generateAnswer } from "@repo/ai/llm";
import { getEmbedding } from "@repo/ai/embedding";
import { topKVectors } from "@repo/vector/search";
export async function queryBrainService(
  query: string,
  userId: string,
  // history: ChatType,
) {
  try {
    const queryVector = await getEmbedding([query]);
    if (!queryVector) throw new Error("No Query Vector Generated");
    // const hybridResult = await hybridSearch(query, queryVector, userId);
    // const vectorResults = await reranker(query, hybridResult, 6);
    const topKresult = await topKVectors(query, queryVector, userId, 6);
    const cleanChunks = generateCleanChunks(topKresult);
    const answer = await generateAnswer(query, cleanChunks);
    const citedIds = answer.response.ids;
    const filteredSources = citedIds.map((i) => {
      const c = topKresult[i]!;
      return {
        score: c.score,
        id: c.id,
        metadata: {
          title: c.payload.title,
          url: c.payload.url,
          author: c.payload.creator,
          contentSource: c.payload.contentSource,
        },
      };
    });
    return {
      answer: answer.response?.output,
      sources: filteredSources,
      citedSources: answer.response?.sources,
    };
  } catch (error: any) {
    throw error;
  }
}
