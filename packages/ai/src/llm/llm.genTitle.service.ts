import { ai_client } from "../client";
import { AI_MODELS } from "@repo/shared/constants";
export async function genTitle(query: string): Promise<string> {
  try {
    const response = await ai_client.responses.create({
      model: AI_MODELS.MODEL_1,
      input: [
        {
          role: "system",
          content:
            "You are an AI assistant that generate the most accurate title for the query that the user has given. keep it short few words not more than that",
        },
        {
          role: "user",
          content: query,
        },
      ],
    });

    if (!response.output_text)
      throw new Error(
        `llm getTitle service failed: ${response.error?.message}`,
      );
    return response.output_text.trim();
  } catch (error) {
    console.error("LLM Ttile Generation Service Failed:", error);
    throw error;
  }
}
