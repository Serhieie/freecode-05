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
 * This Hook for Redux will not take any props, but will give you back reaction if you will set
 * time at break or session field and will press "play". Here is import of simple function
 * for formating time from seconds to MM:SS format and Hook will give you back this object
 * { startPause, reset, formatedSeconds } with few mettods described below and formatedSeconds like 00:05
 */

export const useTimer = () => {
  const dispatch = useDispatch();

  //redux state getted here
  const isRunning = useSelector(getIsRunning);
  const sessionTime = useSelector(getSessionTime);
  const breakTime = useSelector(getBreakTime);
  const seconds = useSelector(getSeconds);

  //audio elements
  const audioDiv = document.querySelector(".beeep");
  const audio = audioDiv?.querySelector("audio");

  //starts here
  useEffect(() => {
    dispatch(setSeconds(sessionTime * 60));
  }, [dispatch, sessionTime]);

  //function for toggle phase from sessiton to break and again to session ...
  const togglePhase = useCallback(() => {
    dispatch(setSeconds(!seconds ? breakTime * 60 : sessionTime * 60));
    dispatch(toggleIsSession());
  }, [sessionTime, breakTime, dispatch, seconds]);

  //simple tick for countdown
  const tick = useCallback(() => {
    if (isRunning && seconds >= 0) {
      dispatch(setSeconds(seconds - 1));
      if (seconds === 0 && breakTime > 0) {
        audio?.play();
        togglePhase();
      }
    }
  }, [isRunning, seconds, togglePhase, dispatch, breakTime, audio]);

  //controllers StartPause and Reset
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

  //using our tick for countdown wich depends of seconds
  useEffect(() => {
    if (isRunning && seconds >= 0) {
      const timeOut = setTimeout(tick, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [tick, isRunning, seconds]);

  //formatting time
  const formatedSeconds = formatTime(seconds);
  dispatch(setCurrentTime(formatedSeconds));

  return { startPause, reset, formatedSeconds };
};
