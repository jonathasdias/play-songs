import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Album } from "@/types/Album";

export function useCreateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (album: { title: string; user_id: string }) => {
      const { data, error } = await supabase
        .from("albums")
        .insert(album)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (newAlbum) => {
      queryClient.setQueryData(["albums"], (old: Album[]) => {
        return old ? [...old, newAlbum] : [newAlbum];
      });
    },
  });
}
