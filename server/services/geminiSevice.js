import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHAT_PROMPT, CODE_PROMPT } from "../constants/systemPrompt.js";

function getMode(prompt) {
  const codeKeywords = [
    "code",
    "algorithm",
    "function",
    "program",
    "script",
    "bug",
    "error",
  ];

  return codeKeywords.some((k) => prompt.toLowerCase().includes(k))
    ? "code"
    : "chat";
}

const genAI = new GoogleGenerativeAI("AIzaSyBOPhC3hGtVgQm7o5O_NoFJcp35ZLpg_Ck");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function* askGeminiStream(prompt) {
  try {
    const mode = getMode(prompt);

    const systemPrompt = mode === "chat" ? CHAT_PROMPT : CODE_PROMPT;

    const fullPrompt = `${systemPrompt}\nUser: ${prompt}\nJarvis:`;

    const responseStream = await model.generateContentStream(fullPrompt);

    for await (const part of responseStream.stream) {
      const text = part.text();
      if (text) yield text;
    }
  } catch (error) {
    console.error("Gemini stream error: ", error);
    throw error;
  }
}
