import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDownloadSong } from "@/hooks/useDownloadSong";
import { useSongPlayerContext } from "@/hooks/useSongPlayerContext";
import { Song } from "@/types/Song";
import { BsThreeDots } from "react-icons/bs";

interface ButtonMoreOptionsPropsTypes {
  song: Song;
}

const ButtonMoreOptions: React.FC<ButtonMoreOptionsPropsTypes> = ({ song }) => {
  const { mutate: downloadSong, isPending } = useDownloadSong();

  const { playbackRate, changeSpeed } = useSongPlayerContext();

  const speeds: number[] = [0.5, 0.75, 1, 1.5, 2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          title="Mais Opções"
          aria-label="Mais Opções"
        >
          <BsThreeDots />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="py-2">
            {speeds.map((rate) => (
              <button
                key={rate}
                onClick={() => changeSpeed(rate)}
                className={`px-2 py-1 rounded border font-semibold text-sm ${
                  playbackRate === rate
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {rate}x
              </button>
            ))}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer py-2 font-bold" asChild>
            <button
              onClick={() =>
                downloadSong({ filePath: song.filePath, fileName: song.name })
              }
              disabled={isPending}
              title="Baixar música"
              aria-label="Baixar música"
              className="w-full"
            >
              Baixar
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonMoreOptions;
