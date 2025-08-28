import dotenv from "dotenv";
dotenv.config();
import { askGeminiStream } from "../services/geminiSevice.js";
import {
  splitSentences,
  ttsSentenceToResponse,
} from "../services/audioStreamer.js";

/**
 * POST /api/ask-stream
 * Body: { prompt: string }
 * Returns: audio/mpeg stream (multiple MP3 chunks)
 */
export async function getJarvisStreamResponse(req, res) {
  try {
    const { prompt } = req.body || {};
    if (!prompt?.trim()) {
      return res.status(400).json({ error: "message is required" });
    }

    // Prepare streaming MP3 response
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-store");

    // Accumulate Gemini text and flush per-sentence to TTS
    let buffer = "";

    for await (const chunk of askGeminiStream(prompt)) {
      buffer += chunk;

      const { sentences, leftover } = splitSentences(buffer);
      buffer = leftover; // keep partial sentence for next loop

      for (const s of sentences) {
        await ttsSentenceToResponse(s, res);
      }
    }

    // Flush any remaining partial text
    if (buffer.trim()) {
      await ttsSentenceToResponse(buffer.trim(), res);
    }

    res.end();
  } catch (err) {
    console.error("❌ getJarvisStream error:", err);
    if (!res.headersSent)
      res.status(500).json({ error: "Something went wrong" });
  }
}
