// src/utils/speak.js

export const speak = (text) => {
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();

  // regex to check wheather text contains hindi or not
  const isHindi = /[\u0900-\u097F]/.test(text);

  let selectedVoice;

  if (isHindi) {
    // Force Google Hindi if available
    selectedVoice =
      voices.find((v) => v.name.includes("Google हिन्दी")) ||
      voices.find((v) => v.lang === "hi-IN") ||
      voices[0]; // fallback
    utterance.lang = "hi-IN";
  } else {
    // Default English voice
    selectedVoice =
      voices.find((v) => v.name.includes("Google US English")) ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];
    utterance.lang = "en-US";
  }

  utterance.voice = selectedVoice;
  speechSynthesis.speak(utterance);
};
