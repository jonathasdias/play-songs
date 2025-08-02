import formatSeconds from "@/utils/formatSeconds";
import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaRepeat, FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { IoPlaySkipBack, IoPlaySkipForwardSharp } from "react-icons/io5";
import { Song } from "@/types/Song";
import ButtonMoreOptions from "../ButtonMoreOptions";

type AudioEvent = React.SyntheticEvent<HTMLAudioElement, Event>;
type InputElement = React.ChangeEvent<HTMLInputElement>;

interface MiniplayerPropsTypes {
  songs: Song[];
  indexSong: number;
  setIndexSong: React.Dispatch<React.SetStateAction<number>>;
}

const Miniplayer: React.FC<MiniplayerPropsTypes> = ({
  songs,
  indexSong,
  setIndexSong,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPLaying, setIsPLaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [duration, setDuration] = useState<number>(0);
  const [repeatSong, setRepeatSong] = useState<boolean>(false);

  function playSong() {
    const audio = audioRef.current;
    if (audio) {
      setTimeout(() => {
        audio.play();
        setIsPLaying(true);
      }, 0);
    }
  }

  function pauseSong() {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPLaying(false);
    }
  }

  function updateDurationTotal(e: AudioEvent) {
    const audio = e.currentTarget;
    setDuration(audio.duration);
  }

  function nextOrRepetSong() {
    if (repeatSong) {
      playSong();
      return;
    }
    pauseSong();
    nextSong();
  }

  function updateProgressSong(e: AudioEvent) {
    const audio = e.currentTarget;
    setCurrentTime(audio.currentTime);
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

  function nextSong() {
    if (indexSong < songs.length - 1) {
      setIndexSong((prev) => prev + 1);
      playSong();
    }
  }

  function prevSong() {
    if (indexSong > 0) {
      setIndexSong((prev) => prev - 1);
      playSong();
    }
  }

  return (
    <div className="border-t-2 bg-gray-950 fixed bottom-0 left-0 right-0 z-10 p-2 flex flex-col gap-y-4">
      {songs.length > 0 && (
        <audio
          ref={audioRef}
          className="hidden"
          onTimeUpdate={updateProgressSong}
          onLoadedMetadata={updateDurationTotal}
          onEnded={nextOrRepetSong}
          src={songs[indexSong].url}
        ></audio>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-sm">{songs[indexSong].name}</h2>

        <ButtonMoreOptions
          changeSpeed={changeSpeed}
          playbackRate={playbackRate}
          song={songs[indexSong]}
        />
      </div>

      <div>
        <div className="bg-gray-900 px-2">
          <input
            type="range"
            name="timerSong"
            id="timerSong"
            className="w-full py-3 cursor-pointer"
            min={0}
            max={duration}
            value={currentTime}
            step="0.8"
            onChange={progressSong}
          />
        </div>
        <div className="flex justify-between px-4">
          <span>{formatSeconds(currentTime)}</span>
          <span>{formatSeconds(duration)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-x-1">
          <label htmlFor="volume">
            {volume !== 0 ? (
              <FaVolumeHigh title="Volume ligado" />
            ) : (
              <FaVolumeXmark title="Volume mutado" />
            )}
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={volumeChange}
            className="w-28"
          />
        </div>
      </div>

      <div className="flex justify-around items-center mt-1 text-2xl">
        <button
          className={`${repeatSong && "bg-gray-900"} p-2`}
          onClick={() => setRepeatSong((prev) => !prev)}
          aria-label="Repetir música"
          title="Repetir música"
        >
          <FaRepeat />
        </button>

        <button
          onClick={prevSong}
          className="p-2 disabled:text-gray-400"
          title="Pular para trás"
          aria-label="Pular para trás"
          disabled={indexSong === 0}
        >
          <IoPlaySkipBack />
        </button>

        {isPLaying ? (
          <button
            onClick={pauseSong}
            className="p-2"
            title="Pausar música"
            aria-label="Pausar música"
          >
            <FaPause />
          </button>
        ) : (
          <button
            onClick={playSong}
            className="p-2"
            title="Tocar música"
            aria-label="Tocar música"
          >
            <FaPlay />
          </button>
        )}

        <button
          onClick={nextSong}
          className="p-2 disabled:text-gray-400"
          title="Pular para frente"
          aria-label="Pular para frente"
          disabled={indexSong === songs.length - 1}
        >
          <IoPlaySkipForwardSharp />
        </button>
      </div>
    </div>
  );
};

export default Miniplayer;
