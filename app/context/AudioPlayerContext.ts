import * as React from "react";

export interface AudioPlayerContextInterface {
  startTime: number;
  setStartTime: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playingTime: number;
  setPlayingTime: React.Dispatch<React.SetStateAction<number>>;
}

const defaultValues: AudioPlayerContextInterface = {
  startTime: 0,
  setStartTime: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  playingTime: 0,
  setPlayingTime: () => {},
};

export const AudioPlayerContext = React.createContext(defaultValues);
