import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatTime } from "../helpers/numFormatter";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState, TimerState } from "./initialState";

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    toggleIsSession(state) {
      state.isSession = !state.isSession;
    },
    putBreakTime(state, action: PayloadAction<number>) {
      state.breakTime = action.payload;
    },
    putSessionTime(state, action: PayloadAction<number>) {
      state.sessionTime = action.payload;
    },
    incrementBreakTime(state) {
      if (state.breakTime < 60) {
        state.breakTime += 1;
      }
    },
    decrementBreakTime(state) {
      if (state.breakTime > 1) {
        state.breakTime -= 1;
      }
    },
    incrementSessionTime(state) {
      if (state.sessionTime < 60) {
        state.sessionTime += 1;
      }
    },
    decrementSessionTime(state) {
      if (state.sessionTime > 1) {
        state.sessionTime -= 1;
      }
    },
    toggleIsTurnedOn(state) {
      state.isTurnedOn = !state.isTurnedOn;
    },
    toggleIsPressed(state) {
      state.isPressed = !state.isPressed;
    },
    setCurrentTime(state, action: PayloadAction<string>) {
      state.currentTime = action.payload;
    },

    resetState(state) {
      state.time = "";
      state.isSession = true;
      state.breakTime = 5;
      state.sessionTime = 25;
      state.isTurnedOn = true;
      state.isPressed = false;
      state.currentTime = formatTime(state.sessionTime * 60);
      state.isRunning = false;
      state.seconds = state.sessionTime * 60;
      state.minutes = 25;
    },

    toggleIsRunning(state) {
      state.isRunning = !state.isRunning;
    },

    setSeconds(state, action: PayloadAction<number>) {
      state.seconds = action.payload;
    },
    setMinutes(state, action: PayloadAction<number>) {
      state.minutes = action.payload;
    },
  },
});

export const persistConfig = {
  key: "timer",
  storage,
  blacklist: ["isPressed"],
};

export const persistedTimerReducer = persistReducer(persistConfig, timerSlice.reducer);
export const {
  toggleIsSession,
  putBreakTime,
  putSessionTime,
  toggleIsTurnedOn,
  toggleIsPressed,
  incrementBreakTime,
  decrementBreakTime,
  decrementSessionTime,
  incrementSessionTime,
  setCurrentTime,
  resetState,
  toggleIsRunning,
  setSeconds,
  setMinutes,
} = timerSlice.actions;

export const getIsSession = (state: { timer: TimerState }) => state.timer.isSession;
export const getBreakTime = (state: { timer: TimerState }) => state.timer.breakTime;
export const getSessionTime = (state: { timer: TimerState }) => state.timer.sessionTime;
export const getIsTurnedOn = (state: { timer: TimerState }) => state.timer.isTurnedOn;
export const getIsPressed = (state: { timer: TimerState }) => state.timer.isPressed;
export const getCurrentTime = (state: { timer: TimerState }) => state.timer.currentTime;
export const getIsRunning = (state: { timer: TimerState }) => state.timer.isRunning;
export const getSeconds = (state: { timer: TimerState }) => state.timer.seconds;
export const getMinutes = (state: { timer: TimerState }) => state.timer.minutes;

export default timerSlice.reducer;