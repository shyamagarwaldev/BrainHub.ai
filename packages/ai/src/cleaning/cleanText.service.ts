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
  } catch (error) {
    let message = error instanceof Error ? error.message : String(error);
    console.error(`Text Cleaning Service Failed with Error: ${message}`);
    throw new Error(`Text Cleaning Service Failed with Error: ${message}`);
  }
}
