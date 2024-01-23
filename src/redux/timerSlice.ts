import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState, TimerState } from "./initialState";

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
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
      if (state.breakTime > 0) {
        state.breakTime -= 1;
      }
    },
    incrementSessionTime(state) {
      if (state.sessionTime < 60) {
        state.sessionTime += 1;
      }
    },
    decrementSessionTime(state) {
      if (state.sessionTime > 0) {
        state.sessionTime -= 1;
      }
    },
    toggleIsTurnedOn(state) {
      state.isTurnedOn = !state.isTurnedOn;
    },
    toggleIsPressed(state) {
      state.isPressed = !state.isPressed;
    },
    changeCurrentTime(state, action: PayloadAction<string>) {
      state.currentTime = action.payload;
    },

    resetState(state) {
      Object.assign(state, initialState);
    },

    toggleStarted(state) {
      state.isPressed = !state.isPressed;
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
  putBreakTime,
  putSessionTime,
  toggleIsTurnedOn,
  toggleIsPressed,
  incrementBreakTime,
  decrementBreakTime,
  decrementSessionTime,
  incrementSessionTime,
  changeCurrentTime,
  resetState,
  toggleStarted,
} = timerSlice.actions;

export const getBreakTime = (state: { timer: TimerState }) => state.timer.breakTime;
export const getSessionTime = (state: { timer: TimerState }) => state.timer.sessionTime;
export const getIsTurnedOn = (state: { timer: TimerState }) => state.timer.isTurnedOn;
export const getIsPressed = (state: { timer: TimerState }) => state.timer.isPressed;
export const getCurrentTime = (state: { timer: TimerState }) => state.timer.currentTime;
export default timerSlice.reducer;
