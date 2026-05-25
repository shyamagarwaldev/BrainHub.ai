import * as cheerio from "cheerio";
import { type TweetType } from "@repo/shared/types";

const INSTANCES = [
  "nitter.net",
  "nitter.poast.org",
  "nitter.privacydev.net",
] as const;

function extractThread(tweets: Array<TweetType>, mainAuthor: string) {
  return tweets
    .filter((t) => t.author.trim() === mainAuthor)
    .map((t) => t.text);
}

function normalizeTwitterUrl(url: string): string {
  return url.replace("x.com", "twitter.com");
}

class NitterExtractor {
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
    if (!res.ok)
      throw new Error(`Nitter fetch failed with baseurl ${this.BaseUrl}`);
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
  try {
    const extractor = [];
    for (const instance of INSTANCES) {
      extractor.push(new NitterExtractor(instance).extract(url));
    }

    const tweets = await Promise.any(extractor);
    let author: string;
    if (!tweets.length || !tweets[0]?.author) {
      throw new Error("Unable to Extract tweets from url");
    }
    author = tweets[0].author.trim();
    const thread = extractThread(tweets, author);
    if (!thread.length) {
      throw new Error("Unable to Extract threds for the author");
    }
    return { thread, author };
  } catch (error) {
    const message =
      error instanceof AggregateError
        ? error.errors
            .map((e) => (e instanceof Error ? e.message : String(e)))
            .join("\n")
        : error instanceof Error
          ? error.message
          : String(error);
    console.error(`x extractor service failed: ${message}`);
    throw new Error(`x extractor service failed: ${message}`);
  }
}
