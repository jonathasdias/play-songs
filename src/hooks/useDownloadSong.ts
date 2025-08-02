import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

interface DownloadSongParams {
  filePath: string;
  fileName: string;
}

export const useDownloadSong = () => {
  return useMutation({
    mutationFn: async ({ filePath, fileName }: DownloadSongParams) => {
      const { data, error } = await supabase.storage
        .from("songs")
        .download(filePath);

      if (error) {
        throw new Error("Erro ao baixar música: " + error.message);
      }

      // Cria um link de download e simula o clique
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url); // limpa a memória
    },
    onSuccess: (_, variables) => {
      toast.success(`Download iniciado: ${variables.fileName}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
