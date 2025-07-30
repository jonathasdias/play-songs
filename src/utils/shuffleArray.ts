import { Song } from "@/types/Song";

export default function shuffleArray(arrayToBeShuffled: Song[]) {
  const size = arrayToBeShuffled.length - 1;

  for (let i = size; i > 0; i--) {
    const randomNumber = Math.floor(Math.random() * size);
    const savePositionArray = arrayToBeShuffled[i];
    arrayToBeShuffled[i] = arrayToBeShuffled[randomNumber];
    arrayToBeShuffled[randomNumber] = savePositionArray;
  }
}
