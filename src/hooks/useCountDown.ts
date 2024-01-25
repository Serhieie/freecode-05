import { useCallback, useEffect, useRef } from "react";
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

export const useTimer = () => {
  const dispatch = useDispatch();

  // redux state getted here
  const isRunning = useSelector(getIsRunning);
  const sessionTime = useSelector(getSessionTime);
  const breakTime = useSelector(getBreakTime);
  const seconds = useSelector(getSeconds);

  // audio elements
  const audioDiv = document.querySelector(".beeep");
  const audio = audioDiv?.querySelector("audio");

  // using useRef to store the formatted seconds
  const formatedSecondsR = useRef(formatTime(seconds));

  // starts here
  useEffect(() => {
    dispatch(setSeconds(sessionTime * 60));
  }, [dispatch, sessionTime]);

  // function for toggle phase from session to break and again to session
  const togglePhase = useCallback(() => {
    dispatch(setSeconds(!seconds ? breakTime * 60 : sessionTime * 60));
    dispatch(toggleIsSession());
  }, [sessionTime, breakTime, dispatch, seconds]);

  // simple tick for countdown
  const tick = useCallback(() => {
    if (isRunning && seconds >= 0) {
      dispatch(setSeconds(seconds - 1));
      if (seconds === 0 && breakTime > 0) {
        audio?.play();
        togglePhase();
      }
    }
  }, [isRunning, seconds, togglePhase, dispatch, breakTime, audio]);

  // controllers StartPause and Reset
  const startPause = () => {
    dispatch(setCurrentTime(formatedSecondsR.current));
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

  // using our tick for countdown which depends on seconds
  useEffect(() => {
    formatedSecondsR.current = formatTime(seconds);
    dispatch(setCurrentTime(formatedSecondsR.current));

    if (isRunning && seconds >= 0) {
      const timeOut = setTimeout(tick, 1000);
      return () => clearTimeout(timeOut);
    }
  }, [tick, isRunning, seconds, dispatch]);

  return { startPause, reset, formatedSeconds: formatedSecondsR.current };
};
