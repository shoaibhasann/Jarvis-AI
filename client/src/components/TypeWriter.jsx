import React, { useEffect, useState } from 'react'

const TypeWriter = ({ text, speed=40, onDone}) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {

        setDisplay(""); // reset when text changes;
        let i = 0;

        const interval = setInterval(() => {
            setDisplay((prev) => prev + text.charAt(i));
            i++;

            if(i >= text.length){
                clearInterval(interval);
                if(onDone) onDone();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onDone])
  return (
    <span>{display}</span>
  )
}

export default TypeWriter