import type { TweetType } from "../types";

export function normalizeTwitterUrl(url: string): string {
  return url.replace("x.com", "twitter.com");
}
export function extractThread(tweets: Array<TweetType>) {
  if (tweets.length === 0) return [];

  const mainAuthor = tweets[0]?.author;

  return tweets.filter((t) => t.author === mainAuthor).map((t) => t.text);
}
