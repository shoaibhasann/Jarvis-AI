import React, { useState } from "react";
import JarvisConsole from "./components/JarvisConsole.jsx";
import VoiceButton from "./components/VoiceButton.jsx";
import ArcReactor from "./components/ArcReactor.jsx";
import { speakJarvisStream } from "./utils/speakJarvisStream.js";


export default function App() {

  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");

  
  const handleVoiceResult = async (text) => {
  setUserText(text);
  setAiText("");

  speakJarvisStream(text);
};

  return (
    <div className="flex flex-col items-center justify-around min-h-screen bg-gradient-to-br from-black via-[#0f0f1a] to-[#1a1a2e] text-white">
      <ArcReactor isSpeaking={!!aiText} />
      <JarvisConsole userText={userText} aiText={aiText} />
      <VoiceButton onResult={handleVoiceResult} />
    </div>
  );
}
