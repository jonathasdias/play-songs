export default function formatSeconds(secondsNumber: number) {
  const hourInSeconds = 3600;
  const minutesInSeconds = 60;

  const hor: number = Math.floor(secondsNumber / hourInSeconds);
  const min: number = Math.floor(
    (secondsNumber - hor * hourInSeconds) / minutesInSeconds
  );
  const sec: number = Math.floor(
    secondsNumber - hor * hourInSeconds - min * minutesInSeconds
  );

  function controlFormatTime(hor: number, min: number, sec: number) {
    if (hor < 1) {
      return `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${hor.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    }
  }

  return controlFormatTime(hor, min, sec);
}
