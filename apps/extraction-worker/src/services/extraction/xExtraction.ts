import { cleanText, translateToEng } from "@repo/ai/cleaning";
import { getTwitterThread } from "@repo/ai/extraction";
import { prisma } from "@repo/db";
import { ContentSource, ProcessingStatus } from "@repo/db/enums";
import type { Content } from "@repo/db/types";
import { uploadCleanedText } from "@repo/storage";

export async function xExtractionProcess(content: Content) {
  let res = await getTwitterThread(content.url!);
  const rawDataObject = {
    id: content.id,
    metadata: {
      createdAt: Date.now().toLocaleString(),
      source: ContentSource.X,
    },
    payload: res,
  };
  const thread = res.thread
    .map((t) => {
      return t.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    })
    .join("\n\n");
  const cleanedTweet = await cleanText(thread);
  // storing in s3
  const { output, key } = await uploadCleanedText(content.userId, content.id, {
    id: content.id,
    metadata: {
      source: ContentSource.X,
      createdAt: Date.now().toLocaleString(),
      creator: res.author,
    },
    content: cleanedTweet,
  });

  if (output.$metadata.httpStatusCode == 200) {
    await prisma.content.update({
      where: {
        id: content.id,
      },
      data: {
        cleanedKey: key,
        creator: res.author,
        status: ProcessingStatus.EXTRACTED,
      },
    });
  } else {
    throw Error("Unable to upload cleaned tweet to s3");
  }
}
