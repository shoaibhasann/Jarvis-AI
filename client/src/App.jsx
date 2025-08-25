import React, { useState } from "react";
import JarvisConsole from "./components/JarvisConsole";
import VoiceButton from "./components/VoiceButton";
import ArcReactor from "./components/ArcReactor";

export default function App() {
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");

  const handleVoiceResult = (text) => {
    setUserText(text);
    setAiText(""); // clear old reply

    // simulate Jarvis speaking
    setTimeout(() => {
      setAiText("Acknowledged sir, I am processing your request.");
      speak("Acknowledged sir, I am processing your request.");
    }, 1500);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = speechSynthesis.getVoices()[0]; // choose voice
    speechSynthesis.speak(utterance);
  }

  return (
    <div className="flex flex-col items-center justify-around min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-[#1a1a2e] text-white ">
      {/* Arc Reactor */}
      <ArcReactor isSpeaking={!!aiText} />

      {/* Jarvis Console */}
      <JarvisConsole userText={userText} aiText={aiText} />

      {/* Mic Button */}
      <VoiceButton onResult={handleVoiceResult} />
    </div>
  );
}
