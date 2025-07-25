import { Album } from "@/types/Album";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useCountMusicsForAlbum } from "@/hooks/useCountMusicsForAlbum";
import { useDeleteAlbum } from "@/hooks/useDeleteAlbum";

interface CardAlbumProps {
  album: Album;
  index: number;
}

const CardAlbum = ({ album, index }: CardAlbumProps) => {
  const navigate = useNavigate();

  const { data: count, error } = useCountMusicsForAlbum(album.id);
  const { mutate: deleteAlbum, isPending: deleteIsPending } = useDeleteAlbum();

  if (error) {
    console.error("Erro ao contar músicas:", error.message);
    return;
  }

  function handleClickNavigation() {
    navigate(
      `/album/${encodeURIComponent(album.title)}/${encodeURIComponent(
        album.id
      )}`
    );
  }

  return (
    <li className="bg-gray-800 rounded-lg shadow p-2 sm:p-4 space-y-1">
      <img
        src={`https://picsum.photos/600/300?album=${index}`}
        alt="Capa do album"
      />

      <div className="flex justify-between items-center">
        <div>
          <h1
            className="text-2xl hover:text-blue-600 hover:underline cursor-pointer"
            onClick={handleClickNavigation}
          >
            {album.title}
          </h1>
          <h2>Músicas: {count}</h2>
        </div>

        {/* no lugar desse botão colocar 3pontinhos dropdow para mostrar opção de deletar e adicionar imagem. */}
        <Button
          className="hover:border-2 border-destructive"
          onClick={() => {
            if (
              album &&
              confirm(
                "Tem certeza que deseja excluir este álbum e suas músicas?"
              )
            ) {
              deleteAlbum(album.id);
            }
          }}
          disabled={deleteIsPending}
        >
          {deleteIsPending ? (
            <p className="animate-pulse">Deletando...</p>
          ) : (
            "Deletar"
          )}
        </Button>
      </div>
    </li>
  );
};

export default CardAlbum;
