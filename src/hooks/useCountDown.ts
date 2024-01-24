import { useCallback, useEffect } from "react";
import { formatTime } from "../helpers/numFormatter";
import { useSelector, useDispatch } from "react-redux";
import {
  getIsRunning,
  toggleIsRunning,
  toggleIsSession,
  getBreakTime,
  getSessionTime,
  getSeconds,
  setSeconds,
  setCurrentTime,
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

export const useTimer = () => {
  const dispatch = useDispatch();
  const isRunning = useSelector(getIsRunning);
  const sessionTime = useSelector(getSessionTime);
  const breakTime = useSelector(getBreakTime);
  const seconds = useSelector(getSeconds);

  const audioDiv = document.querySelector(".beeep");
  const audio = audioDiv?.querySelector("audio");
  const formatedSeconds = formatTime(seconds);

  useEffect(() => {
    dispatch(setSeconds(sessionTime * 60));
  }, [dispatch, sessionTime]);

  const togglePhase = useCallback(() => {
    dispatch(setSeconds(!seconds ? breakTime * 60 : sessionTime * 60));
    dispatch(toggleIsSession());
  }, [sessionTime, breakTime, dispatch, seconds]);

  const tick = useCallback(() => {
    console.log(breakTime, sessionTime);
    if (isRunning && seconds >= 0) {
      dispatch(setSeconds(seconds - 1));
      if (seconds === 0 && breakTime > 0) {
        audio?.play();
        togglePhase();
      }
    }
  }, [isRunning, seconds, togglePhase, dispatch, breakTime, audio]);
  //controllers
  const startPause = () => {
    dispatch(setCurrentTime(formatedSeconds));
    dispatch(toggleIsRunning());
  };
  const reset = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    dispatch(toggleIsSession());
    dispatch(resetState());
  };
  const stop = () => {
    startPause();
    reset();
  };

  useEffect(() => {
    if (isRunning && seconds >= 0) {
      const timeOut = setTimeout(tick, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [tick, isRunning, seconds]);

  dispatch(setCurrentTime(formatedSeconds));

  return { startPause, reset, isRunning, formatedSeconds, stop };
};
