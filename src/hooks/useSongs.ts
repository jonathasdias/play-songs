import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Song } from "@/types/Song";
import { toast } from "react-toastify";

export function useSongs() {
  return useQuery<Song[] | null, Error>({
    queryKey: ["songs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("songs").select("*");

      if (error) {
        toast.error("Erro ao buscar músicas: " + error);
        console.error("Erro ao buscar músicas:", error);
      }

      return data;
    },
  });
}
