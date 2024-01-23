import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  putBreakTime,
  putSessionTime,
  getIsPressed,
  toggleIsPressed,
  toggleStarted,
  getSessionTime,
  getBreakTime,
  decrementSessionTime,
  decrementBreakTime,
  resetState,
} from "../redux/timerSlice";

/**
 *
 *
 * @param imitialTime initial countdown timern in ms
 * @param callback function to exetut curent operation
 * @param interval
 *
 */

export const useCountdown = (callback?: () => void, interval = 1000) => {
  const dispatch = useDispatch();
  const isPressed = useSelector(getIsPressed);
  const breakTime = useSelector(getBreakTime);
  const sessionTime = useSelector(getSessionTime);
  const sessionTimeSeconds = sessionTime * 60;
  const breakTimeSeconds = breakTime * 60;

  const [time, setTime] = useState(sessionTimeSeconds);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          if (callback) callback();
          return breakTimeSeconds;
        }
        return prevTime - 1;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [time, callback, interval, breakTimeSeconds]);

  return formatTime(time);
};
