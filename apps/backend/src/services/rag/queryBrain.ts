import type { ChatType } from "@repo/shared/types";
import { hybridSearch } from "@repo/ai/search";
import { generateCleanChunks } from "./cleanChunks";
import { generateAnswer } from "@repo/ai/llm";
export async function queryBrainService(
  query: string,
  userId: string,
  history: ChatType,
) {
  try {
    const vectorResults = await hybridSearch(query, userId, 6);

    // const uniqueChunks = Array.from(
    //   new Map(vectorResults.map((c) => [c.id, c])).values(),
    // );

    // const cleanChunks = generateCleanChunks(uniqueChunks);

    // const answer = await generateAnswer(query, cleanChunks, history);
    // const citedIds = answer.response.ids;

    // const filteredSources = citedIds.map((i) => {
    //   const c = uniqueChunks[i]!;
    //   return {
    //     score: c.score,
    //     id: c.id,
    //     metadata: {
    //       title: c.payload.metadata.title,
    //       url: c.payload.metadata.url,
    //       author: c.payload.author,
    //     },
    //   };
    // });
    // return {
    //   answer: answer.response?.output,
    //   sources: filteredSources,
    //   citedSources: answer.response?.sources,
    // };
  } catch (error: any) {
    throw error;
  }
}
