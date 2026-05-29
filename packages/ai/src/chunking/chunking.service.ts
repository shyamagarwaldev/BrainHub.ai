import { CHUNK_SIZE, MAX_OVERLAP } from "@repo/shared/constants";

export function chunking(
  text: string,
  MAX_WORDS: number = CHUNK_SIZE,
  overlapNumbers: number = MAX_OVERLAP,
) {
  try {
    const cleaned = text.replace(/\s+/g, " ").trim();
    let data = cleaned
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (data.length <= 1) {
      data = cleaned
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    const all_chunks: string[] = [];
    let chunk_size = 0;
    let chunk: string[] = [];
    for (const sentence of data) {
      const words: string[] = sentence.split(/\s+/);
      if (words.length + chunk_size > MAX_WORDS) {
        if (chunk.length > 0) {
          all_chunks.push(chunk.join(" "));
        }

        const overlap = chunk.join(" ").split(/\s+/).slice(-overlapNumbers);
        chunk = overlap.length > 0 ? [overlap.join(" ")] : [];
        chunk_size = overlap.length;
      }
      chunk_size += words.length;
      chunk.push(sentence);
    }
    chunk.length > 0 ? all_chunks.push(chunk.join(" ")) : undefined;
    return all_chunks;
  } catch (error) {
    let message = error instanceof Error ? error.message : String(error);
    console.error(`Chunking Service Failed with Error: ${message}`);
    throw new Error(`Chunking Service Failed with Error: ${message}`);
  }
}
