export function chunking(
  text: string,
  MAX_WORDS: number = 150,
  overlapNumbers: number = 40,
) {
  try {
    const cleaned = text.replace(/\s+/g, " ").trim();
    let data = cleaned
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (data.length <= 1) {
      data = cleaned.match(/.{1,400}/g) || [];
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

        const overlap = chunk.flatMap((s) =>
          s.split(/\s+/).slice(-overlapNumbers),
        );
        chunk = overlap.length > 0 ? [overlap.join(" ")] : [];
        chunk_size = overlap.length;
      }
      chunk_size += words.length;
      chunk.push(sentence);
    }
    chunk.length > 0 ? all_chunks.push(chunk.join(" ")) : undefined;
    return all_chunks;
  } catch (error) {
    console.error(`Chunking failed ${error}`);
    throw new Error("Chunking Service Failed");
  }
}
