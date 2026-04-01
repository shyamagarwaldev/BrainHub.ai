import { prisma } from "../../db/prisma";
import { ProcessingStatus } from "../../db/generated/prisma/enums";
import type { VectorDataType } from "../../types";
import { chunking } from "../../shared/chunking.service";
import { getEmbedding, getEmbeddings } from "../../shared/embedding.service";
import { getYTTranscript } from "../../shared/extractor.service";
import {
  insertEmbeddings,
  searchEmbeddings,
} from "../../shared/vector.service";
import { generateAnswer } from "../../shared/llm.service";

export async function processContentService(contentId: string, userId: string) {
  try {
    let content = await prisma.content.findUnique({
      where: { id: contentId },
    });

    if (!content) throw new Error("Content Not Found");

    await prisma.content.update({
      where: { id: contentId },
      data: { status: ProcessingStatus.PROCESSING },
    });

    const docs = await getYTTranscript(content.url!);

    const chunks: string[] = chunking(docs);

    const embeddings: number[][] = await getEmbeddings(chunks);

    const vectorData: VectorDataType[] = embeddings.map((e, i) => {
      return {
        id: crypto.randomUUID(),
        vector: e,
        payload: {
          chunkIndex: i,
          userId,
          contentId,
          text: chunks[i]!,
          type: content.type,
        },
      };
    });

    await insertEmbeddings(vectorData);
    await prisma.brainChunk.createMany({
      data: vectorData.map((v) => ({
        qdrantId: v.id,
        contentId,
        userId,
        textPreview: v.payload.text.slice(0, 140),
        chunkIndex: v.payload.chunkIndex,
      })),
    });
    await prisma.content.update({
      where: { id: contentId },
      data: { status: ProcessingStatus.COMPLETED, isInBrain: true },
    });
  } catch (error: any) {
    await prisma.content.update({
      where: { id: contentId },
      data: { status: ProcessingStatus.FAILED, error: error.message },
    });

    throw error;
  }
}

export async function queryBrainService(query: string, userId: string) {
  try {
    const queryVector = await getEmbedding([query]);

    const vectorResults = await searchEmbeddings(queryVector!, userId, 6);
    console.log(vectorResults[0]);

    const uniqueChunks = Array.from(
      new Map(vectorResults.map((c) => [c.id, c])).values(),
    );

    const answer = await generateAnswer(query, uniqueChunks);
    const source = uniqueChunks.map((c) => ({
      score: c.score,
      chunkId: c.id,
      type: c.type,
    }));
    return {
      answer: answer.response.output,
      sources: source,
      citedSources: answer.response.sources,
    };
  } catch (error: any) {
    throw error;
  }
}
