import { cleanText, translateToEng } from "@repo/ai/cleaning";
import { getYTTranscript } from "@repo/ai/extraction";
import { prisma } from "@repo/db";
import { ContentSource, ProcessingStatus } from "@repo/db/enums";
import type { Content } from "@repo/db/types";
import { uploadCleanedText } from "@repo/storage";
export async function ytExtractionProcess(content: Content) {
  let { data, language } = await getYTTranscript(content.url!);
  const rawDataObject = {
    id: content.id,
    metadata: {
      createdAt: Date.now().toLocaleString(),
      source: ContentSource.YOUTUBE,
      language,
    },
    payload: {
      data,
    },
  };
  if (language !== "en") {
    data = await translateToEng(data, language);
  }
  const cleanedData = await cleanText(data);
  // storing in s3
  const { output, key } = await uploadCleanedText(content.userId, content.id, {
    id: content.id,
    metadata: {
      language,
      createdAt: Date.now().toLocaleString(),
      source: ContentSource.YOUTUBE,
    },
    content: cleanedData,
  });

  if (output.$metadata.httpStatusCode == 200) {
    await prisma.content.update({
      where: {
        id: content.id,
      },
      data: {
        cleanedKey: key,
        language,
        status: ProcessingStatus.EXTRACTED,
      },
    });
  } else {
    throw Error("Unable to upload cleaned tweet to s3");
  }
}
