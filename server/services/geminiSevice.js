import { GoogleGenerativeAI } from "@google/generative-ai";

export async function askGemini(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // stable release

    const result = await model.generateContent(prompt); // just pass the string!

    return result.response.text();
  } catch (err) {
    console.error("Gemini Service Error:", err);
    throw err;
  }
}
