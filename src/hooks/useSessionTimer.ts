import { useState, useEffect } from "react";

export function useSessionTimer(isActive: boolean) {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const hours = Math.floor(secondsElapsed / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  const formattedTimer = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return {
    secondsElapsed,
    formattedTimer,
    resetTimer: () => setSecondsElapsed(0),
  };
}
