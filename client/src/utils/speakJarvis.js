export const speakJarvis = async (prompt) => {
  try {
    const res = await fetch("http://localhost:7000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, mode: "audio" }),
    });

    const ct = res.headers.get("content-type") || "";
    if (ct.includes("audio/mpeg")) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
      return "Playing Jarvis…";
    }

    // fallback to text (server can send JSON on error)
    const data = await res.json().catch(() => ({}));
    return data.reply || "Sorry, something went wrong with Jarvis.";
  } catch (err) {
    console.error("❌ Error asking Jarvis:", err);
    return "Sorry, something went wrong with Jarvis.";
  }
};
