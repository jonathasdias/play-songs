import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useCountMusicsForAlbum(albumId: string | null) {
  return useQuery({
    queryKey: ["songCount", albumId],
    enabled: !!albumId,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("songs")
        .select("id", { count: "exact", head: true })
        .eq("album_id", albumId!);

      if (error) {
        throw new Error(error.message);
      }

      return count ?? 0;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
