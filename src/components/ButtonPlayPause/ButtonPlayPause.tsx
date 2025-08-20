import { useSongPlayerContext } from "@/hooks/useSongPlayerContext";
import { FaPause, FaPlay } from "react-icons/fa";

const ButtonPlayPause = () => {
  const { indexSong, isPlaying, playSong, pauseSong } = useSongPlayerContext();

  return (
    <>
      {isPlaying ? (
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
          onClick={() => playSong(indexSong)}
          className="p-2"
          title="Tocar música"
          aria-label="Tocar música"
        >
          <FaPlay />
        </button>
      )}
    </>
  );
};

export default ButtonPlayPause;
