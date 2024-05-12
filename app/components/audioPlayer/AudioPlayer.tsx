"use client";

import React, { useEffect, useState } from "react";
import PlayerControls from "./PlayerControls";
import Reader, { Message } from "./Reader";
import {
  AudioPlayerContext,
  AudioPlayerContextInterface,
} from "../../context/AudioPlayerContext";
import LoadingScreen from "./LoadingScreen";

export const AudioPlayerProvider = (props: any) => {
  const [startTime, setStartTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);

  const contextValue: AudioPlayerContextInterface = {
    startTime,
    setStartTime,
    isPlaying,
    setIsPlaying,
    playingTime,
    setPlayingTime,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {props.children}
    </AudioPlayerContext.Provider>
  );
};

const AudioPlayer = () => {
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [audioSrc, setAudioSrc] = useState("");
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    // estableciendo archivos ejemplo
    setAudioSrc("../assets/TestCall.wav");

    const fetchTranscript = async () => {
      try {
        const response = await fetch("./assets/transcription.json");
        const data = await response.json();
        setTranscript(data);
      } catch (error) {
        console.error("Error fetching transcript:", error);
        setFetchError(true);
      }
    };

    fetchTranscript();
  }, []);

  return (
    <AudioPlayerProvider>
      <div className="flex justify-center h-screen w-full bg-[var(--bg-color-primary)]">
        {fetchError || audioSrc === "" ? (
          <LoadingScreen />
        ) : (
          <>
            <Reader transcript={transcript} />
            <PlayerControls audioSrc={audioSrc} />
          </>
        )}
      </div>
    </AudioPlayerProvider>
  );
};

export default AudioPlayer;
