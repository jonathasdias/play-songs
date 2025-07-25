import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Album } from "@/types/Album";

export function useAllAlbums() {
  return useQuery<Album[]>({
    queryKey: ["albums"],
    queryFn: async () => {
      const { data, error } = await supabase.from("albums").select("*");

      if (error) throw new Error(error.message);
      return data;
    },
  });
}
