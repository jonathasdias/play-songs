import formatSeconds from "@/utils/formatSeconds";
import { FaRepeat, FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { IoPlaySkipBack, IoPlaySkipForwardSharp } from "react-icons/io5";
import { Song } from "@/types/Song";
import ButtonMoreOptions from "../ButtonMoreOptions";
import ButtonPlayPause from "../ButtonPlayPause";
import { useSongPlayerContext } from "@/hooks/useSongPlayerContext";
import { Slider } from "@/components/ui/slider";
import { SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";

interface MiniplayerPropsTypes {
  songs: Song[];
}

const Miniplayer: React.FC<MiniplayerPropsTypes> = ({ songs }) => {
  const {
    audioRef,
    indexSong,
    prevSong,
    nextSong,
    currentTime,
    duration,
    nextOrRepetSong,
    updateDurationTotal,
    updateProgressSong,
    repeatSong,
    setRepeatSong,
    volume,
    progressSong,
    volumeChange,
  } = useSongPlayerContext();

  return (
    <div className="border-t-2 bg-gray-950 fixed bottom-0 left-0 right-0 z-10 p-2 flex flex-col gap-y-4">
      {songs.length > 0 && (
        <audio
          ref={audioRef}
          className="hidden"
          onTimeUpdate={updateProgressSong}
          onLoadedMetadata={updateDurationTotal}
          onEnded={() => nextOrRepetSong(songs)}
          src={songs[indexSong].url}
        ></audio>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-sm">{songs[indexSong].name}</h2>

        <ButtonMoreOptions song={songs[indexSong]} />
      </div>

      <div>
        <div className="bg-gray-900 px-2 rounded">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration}
            step={0.8}
            onValueChange={progressSong}
            className="w-full py-4 cursor-pointer"
          >
            <SliderTrack className="bg-gray-700">
              <SliderRange className="bg-blue-500" />
            </SliderTrack>
            <SliderThumb className="bg-white w-4 h-4" />
          </Slider>
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
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={volumeChange}
            className="w-28"
          >
            <SliderTrack className="bg-gray-500">
              <SliderRange className="bg-blue-500" />
            </SliderTrack>
            <SliderThumb className="bg-blue-700 w-4 h-4" />
          </Slider>
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

        <ButtonPlayPause />

        <button
          onClick={() => nextSong(songs)}
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
