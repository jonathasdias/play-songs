import { Song } from "./Song";

export interface SongPlayerContextType {
  indexSong: number;
  setIndexSong: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  playSong: (index: number) => void;
  pauseSong: () => void;
  nextSong: (songs: Song[]) => void;
  prevSong: () => void;
  repeatSong: boolean;
  setRepeatSong: React.Dispatch<React.SetStateAction<boolean>>;
  updateProgressSong: (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => void;
  updateDurationTotal: (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => void;
  nextOrRepetSong: (songs: Song[]) => void;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  playbackRate: number;
  setPlaybackRate: React.Dispatch<React.SetStateAction<number>>;
  progressSong: (values: number[]) => void;
  volumeChange: (values: number[]) => void;
  changeSpeed: (rate: number) => void;
}
