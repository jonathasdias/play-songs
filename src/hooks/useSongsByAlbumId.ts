import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Song } from "@/types/Song";

export function useSongsByAlbumId(albumId: string) {
  return useQuery<Song[] | null, Error>({
    queryKey: ["songsByAlbumId", albumId],
    queryFn: async () => {
      if (!albumId) return [];

      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("album_id", albumId);

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!albumId,
  });
}
