import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Album } from "@/types/Album";

export function useAlbumByTitle(titleAlbum: string) {
  return useQuery<Album>({
    queryKey: ["albumByTitle", titleAlbum],
    queryFn: async () => {
      if (!titleAlbum) return null;

      const { data, error } = await supabase
        .from("albums")
        .select("*")
        .eq("title", titleAlbum)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!titleAlbum,
  });
}
