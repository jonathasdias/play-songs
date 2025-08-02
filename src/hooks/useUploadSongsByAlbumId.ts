import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";

interface UploadSongsParams {
  files: FileList;
  albumId: string;
}

export const useUploadSongsByAlbumId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ files, albumId }: UploadSongsParams) => {
      let successCount = 0;

      for (const file of Array.from(files)) {
        if (!file.type.startsWith("audio/")) {
          toast.info(`Arquivo ignorado: ${file.name} não é um áudio.`);
          continue;
        }

        const fileName = file.name
          .trim()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-zA-Z0-9._-]/g, "");

        const filePath = `music/${fileName}`;

        // Verifica se já existe
        const { data: existingSong } = await supabase
          .from("songs")
          .select("id")
          .eq("name", file.name)
          .eq("album_id", albumId)
          .maybeSingle();

        if (existingSong) {
          toast.error(`Música duplicada ignorada: ${file.name}`);
          continue;
        }

        // Faz upload
        const { error: uploadError } = await supabase.storage
          .from("songs")
          .upload(filePath, file);

        if (uploadError) {
          toast.error(`Erro ao enviar ${file.name}: ${uploadError.message}`);
          continue;
        }

        // Obtém URL pública
        const { publicUrl } = supabase.storage
          .from("songs")
          .getPublicUrl(filePath).data;

        // Salva no banco
        const { error: insertError } = await supabase.from("songs").insert({
          name: file.name,
          url: publicUrl,
          filePath,
          album_id: albumId,
        });

        if (insertError) {
          toast.error(`Erro ao salvar no banco: ${insertError.message}`);
        } else {
          successCount++;
        }
      }

      return successCount;
    },
    onSuccess: (successCount) => {
      toast.success(`Músicas enviadas com sucesso: ${successCount}`);
      // Atualiza a lista de músicas no cache
      queryClient.invalidateQueries({ queryKey: ["songsByAlbumId"] });
    },
    onError: (error) => {
      toast.error("Erro inesperado ao enviar músicas.");
      console.error(error);
    },
  });
};
