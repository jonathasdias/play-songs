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
      } border-2 p-2 md:px-2 md:py-4 rounded-lg shadow flex justify-between items-center md:flex-col md:items-stretch gap-2`}
    >
      <img
        src={`https://picsum.photos/600/300?song=${index}`}
        alt="capa da música"
        className="h-14 md:h-[149px] bg-gray-950"
      />

      <div className="w-full text-center space-y-2 md:space-y-6">
        <p className="text-[10px] md:text-sm font-medium break-word line-clamp-2">
          {song.name}
        </p>

        <div className="grid grid-cols-4 justify-items-center items-center gap-3">
          <Button
            onClick={() => playSong(index)}
            className="size-8 md:size-10 grid place-items-center rounded-full bg-white text-black"
            aria-label="selecionar musica"
            title="Selecionar musica"
            variant="secondary"
          >
            <FaPlay />
          </Button>
          <Button
            className="size-8 md:size-10 text-blue-600"
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
            className="size-8 md:size-10 text-2xl grid place-items-center rounded-full text-black hover:bg-destructive"
            title="Deletar música"
            aria-label="Deletar música"
            variant="secondary"
            onClick={() => handleClick(song)}
          >
            <MdDelete />
          </Button>
          <Button
            className="size-8 md:size-10 text-orange-400"
            title="adicionar a playlist"
            aria-label="adicionar a playlist"
            variant="secondary"
          >
            <IoMdAddCircle className="w-full" />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CardSong;
