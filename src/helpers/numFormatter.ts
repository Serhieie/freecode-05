export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (!minutes && seconds === 0) return "00:00";
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
