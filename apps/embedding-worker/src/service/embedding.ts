import { chunking } from "@repo/ai/chunking";
import { getEmbeddings } from "@repo/ai/embedding";
import { prisma } from "@repo/db";
import { ContentSource, ProcessingStatus } from "@repo/db/enums";
import { downloadCleanedText } from "@repo/storage";
import { ytEmbeddingProcess } from "./ytEmbedding";
import { xEmbeddingProcess } from "./xEmbedding";
import { storeManyData } from "@repo/vector/store";
import type { IVectorData } from "@repo/shared/types";

// meta data source of truth is db !!!
// content sot id S3

export async function embedding(contentId: string) {
  // from s3
  const content = await prisma.content.update({
    where: {
      id: contentId,
    },
    data: {
      status: ProcessingStatus.EMBEDDING,
    },
  });
  const data = await downloadCleanedText(content.cleanedKey!);
  const chunks: string[] = chunking(data.content);
  const embeddings = await getEmbeddings(chunks);
  let vectorObject: IVectorData[];
  switch (data.metadata?.source) {
    case ContentSource.YOUTUBE:
      vectorObject = await ytEmbeddingProcess(chunks, embeddings, content);
      break;
    case ContentSource.X:
      vectorObject = await xEmbeddingProcess(chunks, embeddings, content);
      break;
    default:
      throw new Error("invalid content source");
  }
  const re = await storeManyData(vectorObject);
  console.log(re);
  const brainChunks = vectorObject.map((d) => ({
    contentId: d.properties?.contentId,
    chunkIndex: d.properties.chunkIndex,
    vectorDBId: d.id,
  }));

  await prisma.$transaction([
    prisma.content.update({
      where: { id: contentId },
      data: { status: ProcessingStatus.COMPLETED, isInBrain: true },
    }),
    prisma.brainChunk.createMany({ data: brainChunks }),
  ]);
}
