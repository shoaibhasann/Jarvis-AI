import React, { useState } from 'react';
import { Mic, MicOff } from "lucide-react";

const VoiceButton = ({ onResult }) => {

    const [listening, setListening] = useState(false);

    const startListening = () => {

        const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

        if(!SpeechRecognition){
            alert("Speech recognition isn't supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onStart = () => setListening(true);
        recognition.onEnd = () => setListening(false);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if(onResult) onResult(transcript); // send transcript back
        }

        recognition.onerror = (event) => {
            console.log("error: in recognition", event.error);
        }

        recognition.start();
    }


  return (
    <button
      onClick={startListening}
      className={`fixed cursor-pointer bottom-8 right-8 p-4 rounded-full shadow-lg transition 
        ${
          listening
            ? "bg-red-500 animate-pulse"
            : "bg-cyan-500 hover:bg-cyan-400"
        }`}
    >
      {listening ? (
        <MicOff size={28} color="white" />
      ) : (
        <Mic size={28} color="white" />
      )}
    </button>
  );
}

export default VoiceButton