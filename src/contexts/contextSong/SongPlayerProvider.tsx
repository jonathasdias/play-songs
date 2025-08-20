import { useEffect, useRef, useState } from "react";
import { SongPlayerContext } from "./SongPlayerContext";
import { SongPlayerContextType } from "@/types/SongPlayerContextType";
import { Song } from "@/types/Song";

type AudioEvent = React.SyntheticEvent<HTMLAudioElement, Event>;

export const SongPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [indexSong, setIndexSong] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [repeatSong, setRepeatSong] = useState<boolean>(false);

  // Sincroniza volume e velocidade
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);

  const playSong = (index: number) => {
    setIndexSong(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 0);
  };

  function pauseSong() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }

  function nextSong(songs: Song[]) {
    if (indexSong < songs.length - 1) {
      const newIndex = indexSong + 1;
      setIndexSong(newIndex);
      playSong(newIndex);
    } else {
      pauseSong();
    }
  }

  function prevSong() {
    if (indexSong > 0) {
      const newIndex = indexSong - 1;
      setIndexSong(newIndex);
      playSong(newIndex);
    } else if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  function updateProgressSong(e: AudioEvent) {
    const audio = e.currentTarget;
    setCurrentTime(audio.currentTime);
  }

  function updateDurationTotal(e: AudioEvent) {
    const audio = e.currentTarget;
    const d = Number.isFinite(audio.duration) ? audio.duration : 0;
    setDuration(d);
  }

  function nextOrRepetSong(songs: Song[]) {
    if (repeatSong) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        playSong(indexSong);
      }
    } else if (indexSong < songs.length - 1) {
      nextSong(songs);
    } else {
      pauseSong();
    }
  }

  function progressSong(values: number[]) {
    const newTime = values[0];
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  }

  function volumeChange(values: number[]) {
    const newVolume = values[0];
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  }

  function changeSpeed(rate: number) {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }

  const valueContext: SongPlayerContextType = {
    indexSong,
    setIndexSong,
    audioRef,
    isPlaying,
    playSong,
    pauseSong,
    nextSong,
    prevSong,
    repeatSong,
    setRepeatSong,
    updateProgressSong,
    updateDurationTotal,
    nextOrRepetSong,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    playbackRate,
    setPlaybackRate,
    progressSong,
    volumeChange,
    changeSpeed,
  };

  return (
    <SongPlayerContext.Provider value={valueContext}>
      {children}
      <audio ref={audioRef} />
    </SongPlayerContext.Provider>
  );
};
