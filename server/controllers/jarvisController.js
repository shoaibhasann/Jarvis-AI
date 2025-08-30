// controllers/jarvisController.js
import { askGemini } from "../services/geminiSevice.js";
import { Readable } from "node:stream";

export const getJarvisResponse = async (req, res) => {
  try {
    const { prompt, mode, voice, rate, pitch } = req.body || {};
    
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "message is required" });
    }
    
    const reply = await askGemini(prompt);

    if (mode === "text") return res.status(200).json({ reply });

    const say = reply.slice(0, 1200);

    // 3) Call Python TTS
    const ttsRes = await fetch("http://localhost:8000/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: say,
        voice: voice || "en-IN-PrabhatNeural",
        rate: rate || "+4%",
        pitch: pitch || "-13Hz",
      }),
    });

    if (!ttsRes.ok || !ttsRes.body) {
      const errTxt = await ttsRes.text().catch(() => "");
      console.error("TTS error:", ttsRes.status, errTxt);
      return res
        .status(200)
        .json({ reply, tts: null, note: "TTS failed; sent text only." });
    }

    // 4) Stream MP3 back
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    Readable.fromWeb(ttsRes.body).pipe(res);
  } catch (error) {
    console.error("❌ Jarvis Controller Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
