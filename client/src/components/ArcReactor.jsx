import React from "react";

export default function ArcReactor({ isSpeaking }) {
  return (
    <div className="relative flex items-center justify-center pt-10 md:pt-16">
      <div className="absolute w-72 h-72 rounded-full border-4 border-cyan-500 border-dashed animate-spin-slow shadow-[0_0_20px_#22d3ee]"></div>
      <div className="absolute w-80 h-80 rounded-full border-2 border-cyan-300 border-dashed animate-spin-slow-reverse shadow-[0_0_30px_#22d3ee]"></div>

      {/* Inner glowing core */}
      <div
        className={`w-40 h-40 rounded-full bg-cyan-400 blur-xl opacity-70 transition-all duration-300 ${
          isSpeaking ? "animate-pulse-strong" : ""
        }`}
      ></div>

      {/* Inner circle border */}
      <div className="absolute w-28 h-28 rounded-full border-4 border-cyan-200"></div>
    </div>
  );
}
