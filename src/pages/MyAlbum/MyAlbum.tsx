import { useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSongsByAlbumId } from "@/hooks/useSongsByAlbumId";
import Miniplayer from "@/components/Miniplayer";
import { useState } from "react";
import UploadSongForm from "@/components/UploadSongForm";
import { toast } from "react-toastify";
import CardSong from "@/components/CardSong";

type PathParams = {
  albumId: string;
  titleAlbum: string;
};

const MyAlbum: React.FC = () => {
  const { titleAlbum, albumId } = useParams<PathParams>();

  const { data: songs, error: songsError } = useSongsByAlbumId(albumId!);

  const [indexSongs, setIndexSong] = useState<number>(0);

  if (songsError) {
    toast.error("Músicas relacionadas a esse album não foram encontradas.");
    console.error(
      "Erro ao buscar músicas relacionadas a esse album:",
      songsError
    );
  }

  return (
    <div className="p-4 pb-64 text-white">
      {songs && (
        <Miniplayer
          songs={songs!}
          indexSong={indexSongs!}
          setIndexSong={setIndexSong}
        />
      )}

      <button
        className="mb-6 text-3xl cursor-pointer"
        title="Voltar para página anterior"
        aria-label="Voltar para página anterior"
        onClick={() => window.history.back()}
      >
        <FaArrowLeftLong />
      </button>

      <h1 className="text-4xl font-bold text-center mb-16">{titleAlbum}</h1>

      <div className="mb-6 border-b p-2 flex justify-between items-center">
        <p>Músicas: {songs?.length}</p>

        {albumId && <UploadSongForm albumId={albumId} />}
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {songs?.length === 0 ? (
          <p className="text-4xl text-gray-400 text-center font-extrabold p-10 col-span-2 md:col-span-4">
            Este álbum ainda não possui músicas.
          </p>
        ) : (
          songs?.map((song, index) => (
            <CardSong
              key={song.id}
              index={index}
              setIndexSong={setIndexSong}
              song={song}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default MyAlbum;
