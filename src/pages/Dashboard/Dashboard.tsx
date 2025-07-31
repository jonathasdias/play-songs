import Loading from "../../components/Loading";
import ButtonAddAlbum from "@/components/ButtonAddAlbum";
import CardAlbum from "@/components/CardAlbum";
import { useAllAlbums } from "@/hooks/useAllAlbums";
import { toast } from "react-toastify";

const Dashboard: React.FC = () => {
  const { data: albums, isLoading, error } = useAllAlbums();

  if (error) {
    toast.error("Erro ao buscar os albums: " + error);
    console.error("Erro ao buscar os albums:", error);
    return;
  }

  return (
    <div className="min-h-screen text-white p-2 sm:p-6">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8">
        🎵 Albums
      </h1>

      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <div className="flex justify-between items-center border-b border-gray-400 p-2">
            <p>
              <b>Albums:</b> {albums?.length}
            </p>

            <ButtonAddAlbum />
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto p-4">
            {albums?.length === 0 && (
              <p className="text-4xl text-gray-400 text-center font-extrabold p-4">
                Você não possui nenhum album.
              </p>
            )}
            {albums?.map((album, index) => (
              <CardAlbum key={album.id} album={album} index={index + 1} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
