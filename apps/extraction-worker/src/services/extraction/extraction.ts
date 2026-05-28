import { ContentSource, ProcessingStatus } from "@repo/db/enums";
import { ytExtractionProcess } from "./ytExtraction";
import type { S3UploadReturnType } from "@repo/storage/types";
import { xExtractionProcess } from "./xExtraction";
import { prisma } from "@repo/db";
import { addToEmbeddingQueue } from "@repo/queue/embeddingQueue";

export async function extraction(contentId: string) {
  const content = await prisma.content.findFirstOrThrow({
    where: {
      id: contentId,
    },
  });
  let res: S3UploadReturnType;
  switch (content.source) {
    case ContentSource.YOUTUBE:
      await ytExtractionProcess(content);
      break;
    case ContentSource.X:
      await xExtractionProcess(content);
      break;
    default:
      throw new Error("invalid content source");
  }

  const job = await addToEmbeddingQueue(contentId, {
    contentId,
    userId: content.userId,
  });
  console.log(`job: ${job}`);
}
