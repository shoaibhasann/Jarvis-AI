export const askJarvis = async (prompt) => {
  try {
    const response = await fetch("http://localhost:8000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Jarvis response");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return { reply: "⚠️ Sorry, something went wrong while contacting Jarvis." };
  }
};
