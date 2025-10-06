import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface TransferAllSongsParams {
  fromAlbumId: string;
  toAlbumId: string;
}

export function useTransferAllSongs() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ fromAlbumId, toAlbumId }: TransferAllSongsParams) => {
      if (!fromAlbumId || !toAlbumId)
        throw new Error("Selecione os dois álbuns.");

      // Atualiza todas as músicas que pertencem ao álbum de origem
      const { data, error } = await supabase
        .from("songs")
        .update({ album_id: toAlbumId })
        .eq("album_id", fromAlbumId)
        .select();

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songsByAlbumId"] });
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });

  return mutation;
}
