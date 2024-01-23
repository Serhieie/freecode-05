import { useSelector } from "react-redux";
import { getSessionTime, getIsTurnedOn } from "../../redux/timerSlice";

export const Display = ({ timeForSession }) => {
  const sessionLength = useSelector(getSessionTime);
  const isTurnedOn = useSelector(getIsTurnedOn);

  return (
    <div
      className={` ${isTurnedOn ? " opacity-display " : "display"}
      w-[520px] h-[240px] md:w-[300px] md:h-[360px] rounded-full mx-auto mt-10 flex flex-col py-8 opacity-0 transition-all`}
    >
      <p
        id="timer-label"
        className={`${
          isTurnedOn ? " opacity-text " : " back-text "
        } text-mainOrange font-digital text-7xl text-center opacity-0`}
      >
        Time for Session
      </p>
      <p
        id="time-left"
        className={`${
          isTurnedOn ? " opacity-text " : " back-text "
        } text-mainOrange font-digital text-9xl text-center transition-all opacity-0`}
      >
        {timeForSession}
      </p>
    </div>
  );
};
