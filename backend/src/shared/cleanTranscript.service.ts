// services/cleanTranscript.ts

import pLimit from "p-limit";
import { splitForLLM } from "../utils/splitForLLM";
import { semanticClean } from "./llm.service";

export async function cleanTranscript(rawText: string): Promise<string> {
  try {
    const blocks = splitForLLM(rawText);
    const limit = pLimit(3);

    const cleanedBlocks = await Promise.all(
      blocks.map((block) => limit(() => semanticClean(block))),
    );

    return cleanedBlocks.join(" ");
  } catch (err) {
    console.error("Full cleaning pipeline failed:", err);
    throw new Error("cleaning service failed");
  }
}
