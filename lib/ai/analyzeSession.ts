import OpenAI from "openai";
import { buildPrompt } from "./prompt";
import { SessionAnalysisSchema } from "./schema";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function analyzeSession(transcript: string) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a specialized medical quality assistant.",
      },
      { role: "user", content: buildPrompt(transcript) },
    ],
    response_format: { type: "json_object" },
  });

  const text = response.choices[0].message.content;

  if (!text) throw new Error("No content from AI");

  try {
    const parsed = JSON.parse(text);
    return SessionAnalysisSchema.parse(parsed);
  } catch (err) {
    console.error("AI parsing or validation failed", err);
    throw new Error("Invalid AI response structure");
  }
}
