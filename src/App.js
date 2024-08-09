import React, { useEffect, useState } from "react";
import { AiFillSound } from "react-icons/ai";

function App() {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    fetchAdvice();
  }, []);

  function fetchAdvice() {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const adviceText = data.slip.advice;
        console.log(adviceText);
        setAdvice(adviceText);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  let isSpeaking = true;
  function convertToSpeech() {
    const synth = window.speechSynthesis;
    const text = advice;

    if (!synth.speaking && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }

    if (text.length > 50) {
      if (synth.speaking && isSpeaking) {
        // button.innerText = "Pause"
        synth.resume();
        isSpeaking = false;
      } else {
        // button.innerText = "Resume"
        synth.pause();
        isSpeaking = true;
      }
    } else {
      isSpeaking = false;
      // button.innerText = "Speaking"
    }

    setInterval(() => {
      if (!synth.speaking && !isSpeaking) {
        isSpeaking = true;
        // button.innerText = "Convert to Speech"
      }
    }, 10);
  }
  return (
    <>
      <div className="app">
        <div className="card">
          <div className="english">
            <h1 className="advice">{advice}</h1>
            <div onClick={convertToSpeech} className="playEnglish">
              <AiFillSound />
            </div>
          </div>
          <button onClick={fetchAdvice}>
            <span> Get Advice </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
