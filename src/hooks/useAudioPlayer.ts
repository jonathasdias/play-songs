import { useRef, useState } from "react";

type AudioEvent = React.SyntheticEvent<HTMLAudioElement, Event>;
type InputElement = React.ChangeEvent<HTMLInputElement>;

const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  function playSong() {
    if (audioRef.current) {
      setTimeout(() => {
        audioRef.current?.play();
      }, 0);
    }
  }

  function pauseSong() {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  function updateProgressSong(e: AudioEvent) {
    const audio = e.currentTarget;
    setCurrentTime(audio.currentTime);
  }

  function updateDurationTotal(e: AudioEvent) {
    const audio = e.currentTarget;
    setDuration(audio.duration);
  }

  function progressSong(e: InputElement) {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }

  function volumeChange(e: InputElement) {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  function changeSpeed(rate: number) {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }

  return {
    playSong,
    pauseSong,
    updateProgressSong,
    updateDurationTotal,
    progressSong,
    volumeChange,
    changeSpeed,
    volume,
    currentTime,
    playbackRate,
    duration,
  };
};

export default useAudioPlayer;
