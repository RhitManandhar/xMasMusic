import React from "react";
import "./index.css";
import { Stop, Play, Pause } from "heroicons-react";
import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const App = () => {
  const [audio] = useState(new Audio("./songs/jingle.mp3"));
  const [randomCount, setRandomCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [tickAudio] = useState(new Audio("./songs/timer.mp3"));

  useEffect(() => {
    if (showDialog) {
      tickAudio.play();

      return () => {};
    }
  }, [showDialog, tickAudio]);

  const playOnClick = () => {
    if (audio.currentTime > 0 && paused) {
      console.log("PAUSE MUSIC !!");
      audio.pause();
      setRandomCount(0);
      setPaused(false);
    } else {
      console.log("Play button clicked!");
      setPaused(true);

      const stopMusicAt = Math.floor(Math.random() * 41) + 10;
      setRandomCount(stopMusicAt);

      console.log("music will stop in", stopMusicAt);
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });

      setTimeout(() => {
        audio.pause();
        console.log("Music paused!");
        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
        }, 12000);
        setRandomCount(0);
        setPaused(false);
      }, stopMusicAt * 1000);
    }
  };

  const pauseOnClick = () => {
    console.log("STOP MUSIC !!");
    audio.pause();
    audio.currentTime = 0;
    setRandomCount(0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-96 h-96 flex justify-center items-center bg-white-500 border-2 border-blue-400 rounded-lg">
        <div className="flex-col">
          <div>
            <button
              className="px-4 py-2 mr-2 text-lg text-white bg-green-400 rounded hover:bg-green-900"
              onClick={playOnClick}
            >
              {paused ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button
              className="px-4 py-2 text-lg text-white bg-red-400 rounded hover:bg-red-900"
              onClick={pauseOnClick}
            >
              <Stop className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white text-lg">
            Music will stop in {randomCount} seconds
          </p>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <CountdownCircleTimer
              isPlaying
              duration={11}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => ({ shouldRepeat: false })}
            >
              {({ remainingTime }) => <p>{remainingTime} seconds</p>}
            </CountdownCircleTimer>
            <p className="text-lg py-2 pl-2">DECISION TIME !!!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
