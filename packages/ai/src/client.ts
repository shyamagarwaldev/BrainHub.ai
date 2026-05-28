import OpenAI from "openai";
export const ai_client = new OpenAI({
  baseURL: process.env.BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});
