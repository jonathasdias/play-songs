import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
// import { BsThreeDotsVertical } from "react-icons/bs";
// <BsThreeDotsVertical />

interface ButtonMoreOptionsPropsTypes {
  audioSrc: string | undefined;
  changeSpeed: (rate: number) => void;
  playbackRate: number;
}

const ButtonMoreOptions: React.FC<ButtonMoreOptionsPropsTypes> = ({
  audioSrc,
  changeSpeed,
  playbackRate,
}) => {
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
          <DropdownMenuItem>
            {speeds.map((rate) => (
              <button
                key={rate}
                onClick={() => changeSpeed(rate)}
                className={`px-2 py-1 rounded border text-sm ${
                  playbackRate === rate
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {rate}x
              </button>
            ))}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <a
              href={audioSrc}
              title="Baixar música"
              aria-label="Baixar música"
              download
            >
              Baixar
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonMoreOptions;
