import type { ResponseInput } from "openai/resources/responses/responses.js";
import { ai_client } from "../integrations/openai";
import type { ContextType, LLMResponseType } from "../types";

export async function generateAnswer(query: string, context: ContextType) {
  const formattedContext = context
    .map((c, i) => `Source ${i + 1} (${c.type}): ${c.text}`)
    .join("\n\n");
  const SYSTEM_PROMT = `You are Geto, a helpful AI assistant.

  Answer ONLY using the provided context.
  If the context does not contain the answer, say:
  "I don't have enough information."
  
  ## Rules:
  - Only answer if enough context is provided
  - Always cite sources
  - Respond STRICTLY in JSON format:
  
  {
    "output": "your answer",
    "sources": [list sources like "notes", "youtube"..]
  }
  
  ## Context:
  ${formattedContext}
  `;

  let messages: ResponseInput = [
    {
      role: "system",
      content: [
        {
          type: "input_text",
          text: SYSTEM_PROMT,
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

  const response = await ai_client.responses.create({
    model: process.env.AI_MODEL!,
    input: messages,
  });
  // console.log(response);
  let parsed: LLMResponseType;
  try {
    parsed = JSON.parse(response.output_text);
  } catch {
    parsed = {
      output: response.output_text,
      sources: [],
    };
  }
  console.log(parsed);

  // return parsed;
  return {
    status: response.status,
    response: parsed,
  };
}
