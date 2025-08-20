import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useStorageUsage(bucketName: string) {
  return useQuery({
    queryKey: ["storage-usage", bucketName],
    queryFn: async () => {
      let totalBytes = 0;
      let page = 0;
      const limit = 1000; // máximo por requisição

      while (true) {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .list("music", {
            limit,
            offset: page * limit,
          });

        if (error) throw new Error(error.message);
        if (!data || data.length === 0) break;

        for (const file of data) {
          if (file.metadata?.size) {
            totalBytes += file.metadata.size;
          }
        }

        // Se retornou menos do que o limite, acabou
        if (data.length < limit) break;
        page++;
      }

      return {
        totalBytes,
        totalMB: totalBytes / (1024 * 1024),
        totalGB: totalBytes / (1024 * 1024 * 1024),
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });
}
