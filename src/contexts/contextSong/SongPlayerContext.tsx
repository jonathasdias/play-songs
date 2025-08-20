import { SongPlayerContextType } from "@/types/SongPlayerContextType";
import { createContext } from "react";

export const SongPlayerContext = createContext<
  SongPlayerContextType | undefined
>(undefined);
