import type {
  ResponseInput,
  ResponseStatus,
} from "openai/resources/responses/responses.js";
import { ai_client } from "../integrations/openai";
import type { ContextType, LLMResponseType } from "../types";
import type { ChatType } from "../types";
import { zodTextFormat } from "openai/helpers/zod.js";
import { LLMResponseSchema } from "../schemas/llmResponse.zod.schema";
import type { Response } from "express";
const model = process.env.AI_MODEL;
export async function generateAnswer(
  query: string,
  context: ContextType,
  history: ChatType,
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
    const formattedHistory = history
      .map((h) => `${h.role.toUpperCase()}: ${h.content}`)
      .join("\n");
    const formattedContext = context
      .map((c, i) => {
        const m = c.metadata;

        return `[${i + 1}]
  ID: ${i + 1}      
  Title: ${m.title ?? "N/A"}
  Author: ${m.author ?? m.channel ?? "N/A"}
  URL: ${m.url ?? "N/A"}
  
  Content:
  ${c.text}`;
      })
      .join("\n\n");
    const SYSTEM_PROMPT = `
  You are Geto, an AI assistant that answers user queries based on their personal knowledge base.
  
  You MUST use:
  1. Retrieved CONTEXT
  2. CHAT HISTORY
  
  ----------------------------------------
  ## Instructions
  
  - Use BOTH context and chat history
  - Resolve follow-up questions using history
  - If context is insufficient, DO NOT guess
  - Prefer information from the most relevant context chunks
  - If multiple sources conflict, prefer the most recent or most detailed one
  
  ----------------------------------------
  ## Strict Rules
  
  - ONLY use provided context
  - DO NOT hallucinate
  - If insufficient info:
    "I don't have enough information."
  
  - Be concise and clear
  
  ----------------------------------------
  ## Source Attribution
  
  - Use ONLY sources from context metadata
  - Prefer: title → author → url → fallback type
  - Sources MUST exactly match metadata
  - NO duplicates
  - NO generic labels if metadata exists
      
  ----------------------------------------
  ## Output Format (STRICT JSON)
  
  - DO NOT output anything outside JSON
  - DO NOT wrap in markdown
  
  - "ids" MUST contain ONLY the numeric IDs from the context (e.g., 1, 2, 3)
  - "ids" MUST correspond exactly to the context entries provided above
  - DO NOT invent IDs
  - ONLY include IDs of chunks actually used in the answer
  
  {
    "output": "answer",
    "sources": ["exact source names"],
    "ids": [1, 2]
  }
  
  ----------------------------------------
  ## Chat History
  
  ${formattedHistory}
  
  ----------------------------------------
  ## Context
  
  ${formattedContext}
      `;

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
      model,
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

export async function semanticClean(text: string): Promise<string> {
  try {
    const prompt = `
    Convert this noisy transcript into clean, structured technical English.
    
    Rules:
    - Fix incorrect words (e.g., gruffana → Grafana, promise → Prometheus, lucky → Loki)
    - Remove filler and repetition
    - Make sentences clear and meaningful
    - Keep technical concepts intact
    - DO NOT summarize
    - Keep it concise but complete
    - Preserve correct technical terms exactly
    
    Text:
    """
    ${text}
    """
    `;

    const response = await ai_client.responses.create({
      model,
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

export async function getTitle(query: string): Promise<string> {
  try {
    const response = await ai_client.responses.create({
      model,
      input: [
        {
          role: "system",
          content:
            "You are an AI assistant that generate the most accurate title for the query that the user has given.",
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
    console.error("llm getTtile service failed:", error);
    throw error;
  }
}
