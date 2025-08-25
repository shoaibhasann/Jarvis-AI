import React from 'react'
import TypeWriter from './TypeWriter'

const JarvisConsole = ({ userText, aiText }) => {
    return (
    <div className=" w-full max-w-xl  p-6 text-lg text-blue-300 flex flex-col justify-center items-start font-mono">
      
      {/* User speech */}
      {userText && (
        <p className="animate-fadeIn text-blue-400 italic">
          ▶ {userText}
        </p>
      )}

      {/* AI reply */}
      {aiText && (
        <p className="text-cyan-300">
          <TypeWriter text={aiText} />
        </p>
      )}
    </div>
  )
}

export default JarvisConsole