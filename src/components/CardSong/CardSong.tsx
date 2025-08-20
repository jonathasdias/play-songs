import { FaPlay } from "react-icons/fa6";
import { FaCircleArrowDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { useDeleteSong } from "@/hooks/useDeleteSong";
import { Song } from "@/types/Song";
import { useDownloadSong } from "@/hooks/useDownloadSong";
import { Button } from "../ui/button";
import { useSongPlayerContext } from "@/hooks/useSongPlayerContext";

interface CardSongPropsTypes {
  song: Song;
  index: number;
}

const CardSong = ({ song, index }: CardSongPropsTypes) => {
  const { mutate: deleteSong, isPending } = useDeleteSong();

  const { mutate: downloadSong } = useDownloadSong();

  const { playSong } = useSongPlayerContext();

  const handleClick = (song: Song) => {
    const confirm = window.confirm(`Deseja deletar a música "${song.name}"?`);
    if (confirm) {
      deleteSong(song);
    }
  };

  return (
    <li
      className={`${
        isPending && "opacity-5"
      } border-2 px-2 py-4 rounded-lg shadow flex flex-col justify-between gap-y-2`}
    >
      <img
        src={`https://picsum.photos/600/300?song=${index}`}
        alt="capa da música"
      />

      <p className="text-sm font-medium break-words">{song.name}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center items-center gap-6 md:gap-3">
        <Button
          onClick={() => playSong(index)}
          className="size-10 grid place-items-center rounded-full bg-white text-black"
          aria-label="selecionar musica"
          title="Selecionar musica"
          variant="secondary"
        >
          <FaPlay />
        </Button>
        <Button
          className="text-blue-600"
          title="Baixar música"
          aria-label="Baixar música"
          variant="secondary"
          onClick={() =>
            downloadSong({
              filePath: song.filePath,
              fileName: song.name,
            })
          }
        >
          <FaCircleArrowDown />
        </Button>
        <Button
          className="size-10 text-2xl grid place-items-center rounded-full text-black hover:bg-destructive"
          title="Deletar música"
          aria-label="Deletar música"
          variant="secondary"
          onClick={() => handleClick(song)}
        >
          <MdDelete />
        </Button>
        <Button
          className="text-orange-400"
          title="adicionar a playlist"
          aria-label="adicionar a playlist"
          variant="secondary"
        >
          <IoMdAddCircle className="w-full" />
        </Button>
      </div>
    </li>
  );
};

export default CardSong;
