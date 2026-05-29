import { ai_client } from "../client";
import { cleanTextPrompt } from "../prompts/textClean.prompt";
import { AI_MODELS } from "@repo/shared/constants";
export async function semanticClean(text: string): Promise<string> {
  try {
    const prompt = cleanTextPrompt(text);

    const response = await ai_client.responses.create({
      model: AI_MODELS.MODEL_1,
      input: [
        { role: "system", content: "You are a text cleaning assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    return response.output_text.trim() || "";
  } catch (err) {
    console.error("llm semantic cleaning service failed:", err);
    throw err;
  }
}
