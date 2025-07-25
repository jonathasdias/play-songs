import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Song } from "@/types/Song";

export function useSongs() {
  return useQuery<Song[] | null, Error>({
    queryKey: ["songs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("songs").select("*");

      if (error) throw new Error(error.message);
      return data;
    },
  });
}
