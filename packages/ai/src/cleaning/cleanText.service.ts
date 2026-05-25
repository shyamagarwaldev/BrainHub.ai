import pLimit from "p-limit";
import { semanticClean } from "../llm/llm.semanticClean.service";
import { chunking } from "../chunking/chunking.service";

export async function cleanText(rawText: string): Promise<string> {
  try {
    if (!rawText.trim()) return "";
    const blocks = chunking(rawText, 1500, 100);
    const concurrencyLimit = pLimit(3);
    const cleanedBlocks = await Promise.all(
      blocks.map((block) => concurrencyLimit(() => semanticClean(block))),
    );

    return cleanedBlocks.join(" ");
  } catch (err) {
    console.error("cleaning service failed:", err);
    throw new Error("cleaning service failed");
  }
}
