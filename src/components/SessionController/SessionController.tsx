import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  getSessionTime,
  incrementSessionTime,
  decrementSessionTime,
  getIsTurnedOn,
} from "../../redux/timerSlice";
import { getIsRunning } from "../../redux/timerSlice";

interface SessionControllerProps {
  onBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SessionController: React.FC<SessionControllerProps> = ({ onBtnClick }) => {
  const dispatch = useDispatch();
  const isTurnedOn = useSelector(getIsTurnedOn);
  const sessionLength = useSelector(getSessionTime);
  const isRunning = useSelector(getIsRunning);

  const handleSessionSetup = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    onBtnClick(e);
    if (!isTurnedOn) return;
    if (!isRunning) {
      if (id === "session-increment") {
        dispatch(incrementSessionTime());
      }
      if (id === "session-decrement") {
        dispatch(decrementSessionTime());
      }
    }
  };

  return (
    <div className="flex flex-col text-center">
      <h2 id="session-label" className="text-2xl mb-4 font-bold md:text-lg">
        Session length
      </h2>
      <div className="flex flex-row gap-8 md:gap-4 md:flex-col items-center md:items-center">
        <p
          id="session-length"
          className={` m-0  pt-2 h-32 md:h-16 md:text-5xl text-mainOrange font-digital
         text-7xl span-shadow flex justify-center items-center px-8 md:px-0`}
        >
          <span
            className={`${
              isTurnedOn ? " opacity-text " : " back-text "
            } opacity-0 min-w-20  md:min-w-0`}
          >
            {sessionLength}
          </span>
        </p>
        <div className="flex justify-center  flex-col-reverse md:flex-row  items-center mt-3 gap-4">
          <button
            id="session-decrement"
            onClick={(e) => handleSessionSetup("session-decrement", e)}
            type="button"
            className={`${
              isTurnedOn ? " button-shadow-opacity " : " button-shadow "
            } button-shadow text-xl md:text-sm block text-textColor 
          p-5 md:p-4  mx-auto  transition-all hover:transition-all opacity-0 rounded-[8px]`}
          >
            <BiSolidDownArrow
              className={`${isTurnedOn ? " opacity-text" : " back-text "}`}
            />
          </button>
          <button
            id="session-increment"
            onClick={(e) => handleSessionSetup("session-increment", e)}
            type="button"
            className={`${
              isTurnedOn ? " button-shadow-opacity " : " button-shadow "
            } button-shadow text-xl md:text-sm block text-textColor 
          p-5 md:p-4  mx-auto transition-all hover:transition-all opacity-0 rounded-[8px]`}
          >
            <BiSolidUpArrow
              className={`${isTurnedOn ? " opacity-text" : " back-text "}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
