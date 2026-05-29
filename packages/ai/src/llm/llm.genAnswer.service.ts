import type {
  ChatType,
  ContextType,
  LLMResponseType,
} from "@repo/shared/types";
import type {
  ResponseInput,
  ResponseStatus,
} from "openai/resources/responses/responses.mjs";
import { generateAnswerPrompt } from "../prompts/genAnswer.prompt";
import { ai_client } from "../client";
import { AI_MODELS } from "@repo/shared/constants";
import { zodTextFormat } from "openai/helpers/zod.js";
import { LLMResponseSchema } from "@repo/shared/schemas";

export async function generateAnswer(
  query: string,
  context: ContextType,
  // history: ChatType,
): Promise<{
  status: ResponseStatus;
  response: LLMResponseType;
}> {
  try {
    if (!context.length) {
      return {
        status: "completed",
        response: {
          output: "I don't have enough information.",
          sources: [],
          ids: [],
        },
      };
    }
    // const formattedHistory = history
    //   .map((h) => `${h.role.toUpperCase()}: ${h.content}`)
    //   .join("\n");
    const formattedContext = context
      .map((c, i) => {
        const m = c.metadata;

        return `[${i + 1}]
  ID: ${i}      
  Title: ${m.title ?? "N/A"}
  Creator: ${m.creator ?? "N/A"}
  URL: ${m.url ?? "N/A"}
  
  Content:
  ${c.text}`;
      })
      .join("\n\n");
    const SYSTEM_PROMPT = generateAnswerPrompt(formattedContext);

    let messages: ResponseInput = [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: SYSTEM_PROMPT,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: query,
          },
        ],
      },
    ];

    const response = await ai_client.responses.parse({
      model: AI_MODELS.MODEL_1,
      input: messages,
      temperature: 0.2,
      text: {
        format: zodTextFormat(LLMResponseSchema, "llm_response"),
      },
    });
    if (!response.output_parsed) {
      throw new Error(`llm generate answer failed: ${response.error?.message}`);
    }
    const uniqueSources = Array.from(new Set(response.output_parsed.sources));
    const uniqueIDS = Array.from(new Set(response.output_parsed.ids));
    const parsed = {
      ...response.output_parsed,
      sources: uniqueSources,
      ids: uniqueIDS,
    };
    console.debug("LLM response:", parsed);
    return {
      status: response.status ?? "completed",
      response: parsed,
    };
  } catch (error) {
    console.error("generating answer failed:", error);
    throw error;
  }
}
