export function splitForLLM(
  text: string,
  size = 4000,
  overlap = 200,
): string[] {
  const blocks: string[] = [];

  for (let i = 0; i < text.length; i += size - overlap) {
    blocks.push(text.slice(i, i + size));
  }

  return blocks;
}
