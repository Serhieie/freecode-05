import { useSelector } from "react-redux";
import { getIsTurnedOn } from "../../redux/timerSlice";
import { getCurrentTime } from "../../redux/timerSlice";
import { getIsSession } from "../../redux/timerSlice";
import beeep from "../../sounds/beep.mp3";

export const Display = () => {
  const isTurnedOn = useSelector(getIsTurnedOn);
  const currentTime = useSelector(getCurrentTime);
  const isSessionPhase = useSelector(getIsSession);

  return (
    <div
      className={` ${isTurnedOn ? " opacity-display " : "display"}
      w-[520px] h-[240px] md:w-[300px] md:h-[360px] rounded-full mx-auto mt-8
      md:mt-6 flex flex-col py-8 opacity-0 transition-all`}
    >
      <p
        id="timer-label"
        className={`${
          isTurnedOn ? " opacity-text " : " back-text "
        } text-mainOrange font-digital text-7xl text-center opacity-0`}
      >
        {isSessionPhase ? "Time for Session" : "break has begun"}
      </p>
      <p
        id="time-left"
        className={`${
          isTurnedOn ? " opacity-text " : " back-text "
        } text-mainOrange font-digital text-9xl text-center transition-all opacity-0`}
      >
        {currentTime}
      </p>
      <div className="beeep">
        <audio id="beep" src={beeep}></audio>
      </div>
    </div>
  );
};
