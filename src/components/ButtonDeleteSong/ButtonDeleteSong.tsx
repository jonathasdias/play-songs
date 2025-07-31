import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";
import { Song } from "../../types/Song";

interface ButtonDeleteSongProps {
  song: Song;
}

const ButtonDeleteSong: React.FC<ButtonDeleteSongProps> = ({ song }) => {
  const deleteSong = async () => {
    const confirm = window.confirm(`Deseja deletar a música "${song.name}"?`);
    if (!confirm) return;

    try {
      // Remover do Storage
      const { error: storageError } = await supabase.storage
        .from("songs")
        .remove([song.filePath]);

      if (storageError) {
        toast.error("Erro ao remover do storage: " + storageError);
        return;
      }

      // Remover do banco de dados
      const { error: dbError } = await supabase
        .from("songs")
        .delete()
        .eq("id", song.id);
      if (dbError) {
        toast.error("Erro ao remover do banco de dados: " + dbError);
        return;
      }
    } catch (error) {
      toast.error("Erro ao deletar a música: " + error);
    }
  };

  return (
    <button
      onClick={deleteSong}
      className="flex flex-nowrap gap-x-1 text-sm rounded-lg hover:outline-2 transition-all duration-100 ease-linear py-[0.6em] px-[1.2em] bg-[#1a1a1a]"
    >
      <span>❌</span> Deletar
    </button>
  );
};

export default ButtonDeleteSong;
