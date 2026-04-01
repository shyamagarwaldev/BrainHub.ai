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
    
    Text:
    """
    ${text}
    """
    `;

    const response = await ai_client.responses.create({
      model: process.env.AI_MODEL,
      input: [
        { role: "system", content: "You are a text cleaning assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    return response.output_text.trim() || "";
  } catch (err) {
    console.error("Semantic cleaning service Failed:", err);
    throw err;
  }
}
