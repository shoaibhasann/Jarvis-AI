export const askJarvis = async (prompt) => {
  try {

    const response = await fetch("http://localhost:7000/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await response.json();
    return data.reply;
  } catch (err) {
    console.error("❌ Error asking Jarvis:", err);
    return "Sorry, something went wrong with Jarvis.";
  }
};
