import { useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAlbumByTitle } from "@/hooks/useAlbumByTitle";
import { useSongsByAlbumId } from "@/hooks/useSongsByAlbumId";

type PathParams = {
  albumId: string;
  titleAlbum: string;
};

const MyAlbum: React.FC = () => {
  const { titleAlbum, albumId } = useParams<PathParams>();

  const { data: album, error: albumError } = useAlbumByTitle(titleAlbum!);

  const { data: songs, error: songsError } = useSongsByAlbumId(albumId!);

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

  {
    /* colocar um player pequeno fixo colado no bottom do site. apenas na página inicial. */
  }

  return (
    <div className="p-4 text-white">
      <FaArrowLeftLong
        className="mb-6 text-3xl cursor-pointer"
        title="Voltar para página anterior"
        onClick={() => window.history.back()}
      />
      <h1 className="text-4xl font-bold text-center">{album.title}</h1>

      <div className="mb-6 border-b p-2 flex justify-between items-center">
        <p>Músicas: {songs?.length}</p>
      </div>

      {songs?.length === 0 ? (
        <p>Este álbum ainda não possui músicas.</p>
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {songs?.map((song, index) => (
            <li
              key={song.id}
              className="border-2 px-2 py-4 rounded-lg shadow flex flex-col justify-between"
            >
              <img
                src={`https://picsum.photos/600/300?song=${index}`}
                alt="capa da música"
              />
              <p className="font-medium">{song.name}</p>
              <audio controls src={song.url} className="mt-1 w-full " />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAlbum;
