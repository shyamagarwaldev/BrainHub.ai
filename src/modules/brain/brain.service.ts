import { prisma } from "../../db/postgres";
import { ProcessingStatus } from "../../db/generated/prisma/enums";
import type { VectorDataType } from "../../types";
import { chunking } from "../../services/chunking.service";
import { getEmbedding, getEmbeddings } from "../../services/embedding.service";
import { getYTTranscript } from "../../services/extractor.service";
import {
  insertEmbeddings,
  searchEmbeddings,
} from "../../services/vector.service";
import { generateAnswer } from "../../services/llm.service";

export async function processContent(contentId: string, userId: string) {
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
      data: { status: ProcessingStatus.COMPLETED },
    });
  } catch (error: any) {
    await prisma.content.update({
      where: { id: contentId },
      data: { status: ProcessingStatus.FAILED, error: error.message },
    });

    throw error;
  }
}

export async function queryBrain(query: string, userId: string) {
  try {
    const queryVector = await getEmbedding([query]);

    const vectorResults = await searchEmbeddings(queryVector!, userId, 3);

    const chunks = vectorResults.map((vr) => ({
      text: vr.text,
      type: vr.type,
    }));

    const context = [...new Set(chunks)];

    const answer = await generateAnswer(query, context);
    return {
      answer,
      sources: chunks,
    };
  } catch (error: any) {
    throw error;
  }
}
