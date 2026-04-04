import { prisma } from "../../db/prisma";
import { ContentType, ProcessingStatus } from "../../db/generated/prisma/enums";
import {
  PayloadContentType,
  type TweetType,
  PlatformType,
  type PayloadType,
  type ContextType,
  type VectorDataType,
} from "../../types";
import { chunking } from "../../shared/chunking.service";
import { getYTTranscript } from "../../shared/extractor.service";
import { hybridSearch, storeChunks } from "../../shared/python.service";
import { generateAnswer } from "../../shared/llm.service";
import type { Content } from "../../db/generated/prisma/client";
import * as cheerio from "cheerio";
import { extractThread, normalizeTwitterUrl } from "../../utils/twitter";
import type { ChatType } from "../../types/chat";

function generateCleanChunks(
  chunks: {
    score: number;
    payload: PayloadType;
    id: string;
  }[],
): ContextType {
  return chunks.map((c) => {
    switch (c.payload.metadata.contentType) {
      case PayloadContentType.tweet:
        return {
          text: c.payload.text,
          id: c.id,
          metadata: {
            platform: c.payload.metadata.platform,
            contentType: c.payload.metadata.contentType,
            title: c.payload.metadata.title,
            url: c.payload.metadata.url,
            author: c.payload.metadata.author,
          },
        };
      case PayloadContentType.video:
        return {
          text: c.payload.text,
          id: c.id,
          metadata: {
            platform: c.payload.metadata.platform,
            contentType: c.payload.metadata.contentType,
            title: c.payload.metadata.title,
            url: c.payload.metadata.url,
          },
        };
      default:
        throw new Error(
          "invalid content type: failed at generate clean chunk funtion",
        );
    }
  });
}
export class NitterExtractor {
  constructor(private BaseUrl: string) {}
  async extract(url: string): Promise<Array<TweetType>> {
    const normalizedURL = normalizeTwitterUrl(url);
    const nitterUrl = normalizedURL.replace("twitter.com", this.BaseUrl);
    const res = await fetch(nitterUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    if (!res.ok) throw new Error("Nitter fetch failed");
    const html = await res.text();
    const $ = cheerio.load(html);
    const tweets: Array<TweetType> = [];

    $(".timeline-item").each((_, el) => {
      const text = $(el).find(".tweet-content").text().trim();
      const author = $(el).find(".username").text().trim();

      if (text) tweets.push({ text, author });
    });
    if (tweets.length === 0) {
      throw new Error("No tweets found");
    }
    return tweets;
  }
}

export async function getTwitterThread(
  url: string,
): Promise<{ thread: string[]; author: string }> {
  const INSTANCES = [
    "nitter.net",
    "nitter.poast.org",
    "nitter.privacydev.net",
  ] as const;
  const errors: string[] = [];

  for (const instance of INSTANCES) {
    try {
      const extractor = new NitterExtractor(instance);
      const tweets = await extractor.extract(url);
      const thread = extractThread(tweets);
      const author = tweets[0]?.author!;

      if (thread.length > 0) return { thread, author };
    } catch (err: any) {
      errors.push(`${instance}: ${err.message}`);
    }
  }
  throw new Error("All extractors failed:\n" + errors.join("\n"));
}

export async function processYT(content: Content) {
  const docs = await getYTTranscript(content.url!);

  const chunks: string[] = chunking(docs);

  // const embeddings: number[][] = await getEmbeddings(chunks);
  const vectorData = chunks.map((chunk, i) => {
    return {
      id: crypto.randomUUID(),
      payload: {
        chunkIndex: i,
        userId: content.userId,
        contentId: content.id,
        text: chunk,
        metadata: {
          contentType: PayloadContentType.video,
          platform: PlatformType.youtube,
          url: content.url,
          title: content.title,
        },
      },
    };
  });
  // await insertEmbeddings(vectorData);
  await storeChunks(vectorData);
  await prisma.brainChunk.createMany({
    data: vectorData.map((v) => ({
      qdrantId: v.id,
      contentId: content.id,
      userId: content.userId,
      textPreview: v.payload.text.slice(0, 140),
      chunkIndex: v.payload.chunkIndex,
    })),
  });
}

export async function processX(content: Content) {
  const res = await getTwitterThread(content.url!);
  const thread = res.thread
    .map((t) => {
      return t.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    })
    .join("\n\n");
  const chunks: string[] = chunking(thread);
  // const embeddings = await getEmbeddings(chunks);

  const vectorData = chunks.map((chunk, i) => {
    return {
      id: crypto.randomUUID(),
      payload: {
        userId: content.userId,
        contentId: content.id,
        chunkIndex: i,
        text: chunk,
        metadata: {
          contentType: PayloadContentType.tweet,
          platform: PlatformType.twitter,
          url: content.url,
          title: content.title,
          author: res.author,
        },
      },
    };
  });
  // await insertEmbeddings(vectorData);
  const re = await storeChunks(vectorData);
  console.log(re);
  await prisma.brainChunk.createMany({
    data: vectorData.map((v) => ({
      qdrantId: v.id,
      contentId: content.id,
      userId: content.userId,
      textPreview: v.payload.text.slice(0, 140),
      chunkIndex: v.payload.chunkIndex,
    })),
  });
}

export async function processArticle(content: Content) {}

export async function processNote(content: Content) {}

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
    switch (content.type) {
      case ContentType.YOUTUBE:
        await processYT(content);
        break;
      case ContentType.TWITTER:
        await processX(content);
        break;
      case ContentType.ARTICLE:
        await processArticle(content);
        break;
      case ContentType.NOTE:
        await processNote(content);
        break;
      default:
        throw new Error("Invalid Content Type");
    }
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

export async function queryBrainService(
  query: string,
  userId: string,
  history: ChatType,
) {
  try {
    // const queryVector = await getEmbedding([query]);

    const vectorResults = await hybridSearch(query, userId, 6);

    const uniqueChunks = Array.from(
      new Map(vectorResults.map((c) => [c.id, c])).values(),
    );

    const cleanChunks = generateCleanChunks(uniqueChunks);

    const answer = await generateAnswer(query, cleanChunks, history);
    const citedIds = answer.response.ids;

    const filteredSources = citedIds.map((i) => {
      const c = uniqueChunks[i]!;
      return {
        score: c.score,
        id: c.id,
        metadata: {
          title: c.payload.metadata.title,
          url: c.payload.metadata.url,
          author: c.payload.metadata.author,
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
