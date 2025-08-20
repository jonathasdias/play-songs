import { SongPlayerContext } from "@/contexts/contextSong/SongPlayerContext";
import { useContext } from "react";

export const useSongPlayerContext = () => {
  const context = useContext(SongPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useSongPlayer deve ser usado dentro de um SongPlayerProvider"
    );
  }
  return context;
};
