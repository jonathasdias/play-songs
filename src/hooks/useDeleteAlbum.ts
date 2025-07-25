import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useDeleteAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (albumId: string) => {
      const { error } = await supabase
        .from("albums")
        .delete()
        .eq("id", albumId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["albumByTitle"] });
      queryClient.invalidateQueries({ queryKey: ["songsByAlbumId"] });
    },
  });
}
