export interface TimerState {
  time: string;
  breakTime: number;
  sessionTime: number;
  isTurnedOn: boolean;
  isPressed: boolean;
  currentTime: string;
  started: boolean;
}

export const initialState: TimerState = {
  time: "",
  breakTime: 5,
  sessionTime: 25,
  isTurnedOn: true,
  isPressed: false,
  currentTime: "",
  started: false,
};
