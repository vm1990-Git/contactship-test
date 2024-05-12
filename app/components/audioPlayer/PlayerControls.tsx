import React, { useRef, useEffect, useContext } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { AudioPlayerContext } from "../../context/AudioPlayerContext";

interface PlayerControlsProps {
  audioSrc: string;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { startTime, isPlaying, setIsPlaying, setPlayingTime } =
    useContext(AudioPlayerContext);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      if (audio) {
        setPlayingTime(audio.currentTime);
      }
    };
    audio?.addEventListener("timeupdate", updateTime);
    return () => {
      audio?.removeEventListener("timeupdate", updateTime);
    };
  }, [setPlayingTime]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = startTime;
    }
  }, [startTime]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnd = () => {
      setIsPlaying(false);
    };
    audio?.addEventListener("ended", handleEnd);
    return () => {
      audio?.removeEventListener("ended", handleEnd);
    };
  }, [setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopPlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed flex bottom-0 z-10 justify-center gap-10 items-center w-full p-2 md:p-4 bg-neutral-800 shadow-md shadow-white h-[10vh]">
      <audio ref={audioRef} src={audioSrc} />
      <div
        onClick={togglePlay}
        className="p-2 px-4 rounded-md bg-neutral-700 hover:bg-blue-500"
      >
        {isPlaying ? (
          <FaPause size={20} color="white" />
        ) : (
          <FaPlay size={20} color="white" />
        )}
      </div>
      <div
        onClick={stopPlay}
        className="p-2 px-4 rounded-md bg-neutral-700 hover:bg-blue-500"
      >
        <FaStop size={20} color="white" />
      </div>
    </div>
  );
};

export default PlayerControls;
