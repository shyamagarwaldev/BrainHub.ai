import { prisma } from "@repo/db";
import { ContentSource, ProcessingStatus } from "@repo/db/enums";
import type { IVectorData } from "@repo/shared/types";
import { processYT } from "./processYT";
import { processX } from "./processX";
import { storeManyData } from "@repo/vector/store";
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
    let data: IVectorData[];
    switch (content.source) {
      case ContentSource.YOUTUBE:
        data = await processYT(content);
        break;
      case ContentSource.X:
        data = await processX(content);
        break;
      // case ContentType.ARTICLE:
      //   await processArticle(content);
      //   break;
      // case ContentType.NOTE:
      //   await processNote(content);
      //   break;
      default:
        throw new Error("Invalid Content Type");
    }
    const re = await storeManyData(data);
    console.log(re);
    const chunks = data.map((d) => ({
      contentId: d?.properties?.contentId!,
      chunkIndex: d.properties.chunkIndex,
      vectorDBId: d.id,
    }));
    await prisma.$transaction([
      prisma.content.update({
        where: { id: contentId },
        data: { status: ProcessingStatus.COMPLETED, isInBrain: true },
      }),
      prisma.brainChunk.createMany({ data: chunks }),
    ]);
  } catch (error: any) {
    await prisma.content.update({
      where: { id: contentId },
      data: { status: ProcessingStatus.FAILED, error: error.message },
    });
    throw error;
  }
}
