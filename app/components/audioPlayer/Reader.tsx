import React, { useContext } from "react";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";

export interface Message {
  content: string;
  role: string;
  start: number;
  end: number;
}

interface ReaderProps {
  transcript: Message[];
}

const Reader: React.FC<ReaderProps> = ({ transcript }) => {
  const { setStartTime, setIsPlaying, playingTime } =
    useContext(AudioPlayerContext);

  const handleClick = (start: number) => {
    setStartTime(
      (prevStartTime) => (prevStartTime === start ? start - 0.000001 : start) // permite reiniciar audio de texto selecionado
    );
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col p-4 overflow-y-scroll no-scrollbar gap-1  h-[90vh] ">
      {transcript.map((message, index) => {
        const isWithinTimeRange =
          playingTime >= message.start && playingTime <= message.end;
        const messageColorClass =
          message.role === "agent"
            ? isWithinTimeRange
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
            : isWithinTimeRange
            ? "bg-blue-500 text-white"
            : "bg-white";

        return (
          <div
            key={index}
            className={`flex w-[90vw] sm:w-96 select-none ${
              message.role === "agent" ? "justify-start" : "justify-end"
            }`}
            onClick={() => handleClick(message.start)}
          >
            <div
              className={`flex flex-col rounded-lg max-w-[75vw] sm:max-w-72 py-1 px-2 cursor-pointer ${messageColorClass}`}
            >
              <span className="font-semibold text-sm">{message.role}</span>
              <span className="flex justify-center text-sm">
                {message.content}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reader;
