import { useParams } from "react-router";
import { FaArrowLeftLong, FaPlay } from "react-icons/fa6";
import { useAlbumByTitle } from "@/hooks/useAlbumByTitle";
import { useSongsByAlbumId } from "@/hooks/useSongsByAlbumId";
import Miniplayer from "@/components/Miniplayer";
import { useState } from "react";
import { FaCircleArrowDown } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import UploadSongForm from "@/components/UploadSongForm";

type PathParams = {
  albumId: string;
  titleAlbum: string;
};

const MyAlbum: React.FC = () => {
  const { titleAlbum, albumId } = useParams<PathParams>();

  const { data: album, error: albumError } = useAlbumByTitle(titleAlbum!);

  const { data: songs, error: songsError } = useSongsByAlbumId(albumId!);

  const [indexSongs, setIndexSong] = useState<number>(0);

  if (albumError) {
    alert("Erro ao buscar álbum");
    console.error("Erro ao buscar álbum:", albumError);
    return;
  }

  if (songsError) {
    alert("Músicas relacionadas a esse não foram encontradas.");
    console.error("Erro ao buscar músicas:", songsError);
  }

  if (!album) return <p>Álbum não encontrado.</p>;

  return (
    <div className="p-4 pb-64 text-white">
      {songs && (
        <Miniplayer
          songs={songs!}
          indexSong={indexSongs!}
          setIndexSong={setIndexSong}
        />
      )}

      <FaArrowLeftLong
        className="mb-6 text-3xl cursor-pointer"
        title="Voltar para página anterior"
        onClick={() => window.history.back()}
      />
      <h1 className="text-4xl font-bold text-center">{album.title}</h1>

      <div className="mb-6 border-b p-2 flex justify-between items-center">
        <p>Músicas: {songs?.length}</p>

        {albumId && <UploadSongForm albumId={albumId} />}
      </div>

      {songs?.length === 0 ? (
        <p>Este álbum ainda não possui músicas.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs?.map((song, index) => (
            <li
              key={song.id}
              className="border-2 px-2 py-4 rounded-lg shadow flex flex-col justify-between gap-y-2"
            >
              <img
                src={`https://picsum.photos/600/300?song=${index}`}
                alt="capa da música"
              />
              <p className="font-medium">{song.name}</p>
              <audio controls src={song.url} className="mt-1 w-full" />
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIndexSong(index)}
                  className="size-10 grid place-items-center rounded-full bg-white text-black"
                  aria-label="selecionar musica"
                  title="Selecionar musica"
                >
                  <FaPlay />
                </button>
                <a
                  href={song.url}
                  className="text-4xl text-blue-600"
                  title="Baixar música"
                  download
                >
                  <FaCircleArrowDown />
                </a>
                <button
                  className="size-10 text-2xl grid place-items-center rounded-full text-black bg-destructive"
                  title="Deletar música"
                  aria-label="Deletar música"
                >
                  <MdDelete />
                </button>
                <button
                  className="text-5xl text-orange-400"
                  title="adicionar a playlist"
                  aria-label="adicionar a playlist"
                >
                  <IoMdAddCircle />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAlbum;
