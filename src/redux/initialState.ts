import { formatTime } from "../helpers/numFormatter";

export interface TimerState {
  time: string;
  isSession: boolean;
  breakTime: number;
  sessionTime: number;
  isTurnedOn: boolean;
  isPressed: boolean;
  currentTime: string;
  isRunning: boolean;
  seconds: number;
  minutes: number;
}

export const initialState: TimerState = {
  time: "",
  isSession: true,
  breakTime: 5,
  sessionTime: 25,
  isTurnedOn: true,
  isPressed: false,
  currentTime: formatTime(25 * 60),
  isRunning: false,
  seconds: 25 * 60,
  minutes: 25,
};
