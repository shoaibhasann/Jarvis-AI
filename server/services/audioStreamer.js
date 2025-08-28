// services/audioStreamer.js
import { Readable } from "node:stream";

const TTS_URL = "http://localhost:8000/tts";
const VOICE = "en-IN-PrabhatNeural";
const RATE = "+12%";
const PITCH = "-12Hz";

// 1) Split buffered text into complete sentences + leftover (partial sentence)
export function splitSentences(buffer) {
  const parts = buffer.split(/(?<=[.!?])\s+/);
  const leftover = parts.pop() ?? "";
  const sentences = parts.map((s) => s.trim()).filter(Boolean);
  return { sentences, leftover };
}

// 2) Send ONE sentence to Python TTS and pipe the MP3 bytes into res
export async function ttsSentenceToResponse(sentence, res) {
  const text = sentence.slice(0, 600); // keep chunks short
  if (!text) return;

  const ttsRes = await fetch(TTS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, voice: VOICE, rate: RATE, pitch: PITCH }),
  });

  if (!ttsRes.ok || !ttsRes.body) {
    console.error(
      "TTS failed chunk:",
      ttsRes.status,
      await ttsRes.text().catch(() => "")
    );
    return;
  }

  // Convert WHATWG ReadableStream to Node stream and pipe into Express res
  const nodeStream = Readable.fromWeb(ttsRes.body);
  await new Promise((resolve, reject) => {
    // bubble errors from either side
    const onError = (err) => {
      // detach listeners to avoid leaks
      nodeStream.off("end", onEnd);
      res.off("error", onError);
      reject(err);
    };
    const onEnd = () => {
      res.off("error", onError);
      resolve();
    };

    nodeStream.once("error", onError);
    res.once("error", onError);

    // keep response open for subsequent sentences
    nodeStream.pipe(res, { end: false }).once("error", onError);
    nodeStream.once("end", onEnd);
  });
}
