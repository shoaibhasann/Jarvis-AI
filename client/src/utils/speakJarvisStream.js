// utils/speakJarvisStreamSimple.js
export async function speakJarvisStream(prompt) {
  const res = await fetch("http://localhost:7000/api/ask/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const ct = (res.headers.get("content-type") || "").toLowerCase();
  if (!ct.includes("audio/mpeg") || !res.body) {
    const data = await res.json().catch(() => ({}));
    console.warn("Fallback text:", data);
    return;
  }

  // getReader() gives you a reader to read chunks progressively.
  const reader = res.body.getReader();
  const chunks = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const blob = new Blob(chunks, { type: "audio/mpeg" });
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  try {
    await audio.play();
  } catch {
    audio.controls = true;
    document.body.appendChild(audio);
  }
}
