import { useSelector, useDispatch } from "react-redux";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import {
  getBreakTime,
  incrementBreakTime,
  decrementBreakTime,
  getIsTurnedOn,
  getIsRunning,
} from "../../redux/timerSlice";

export const BreakController = ({ onBtnClick }) => {
  const dispatch = useDispatch();
  const isTurnedOn = useSelector(getIsTurnedOn);
  const breakLength = useSelector(getBreakTime);
  const isRunning = useSelector(getIsRunning);

  const handleBreakSetup = (id, e) => {
    onBtnClick(e);
    if (!isTurnedOn) return;
    if (!isRunning) {
      if (id === "break-increment") {
        dispatch(incrementBreakTime());
      }
      if (id === "break-decrement") {
        dispatch(decrementBreakTime());
      }
    }
  };

  return (
    <div className="flex flex-col text-center items-center">
      <h2 id="break-label" className="text-2xl mb-4 font-bold md:text-lg">
        Break length
      </h2>
      <div className="flex items-center flex-row-reverse gap-10 md:gap-4 md:flex-col">
        <p
          id="break-length"
          className={` m-0  pt-2 h-32  md:h-16 md:text-5xl text-mainOrange font-digital
         text-7xl span-shadow flex justify-center items-center px-8 md:px-0 `}
        >
          <span
            className={`${
              isTurnedOn ? " opacity-text " : " back-text "
            } opacity-0 min-w-20  md:min-w-0`}
          >
            {breakLength}
          </span>
        </p>
        <div className="flex justify-center flex-col-reverse md:flex-row items-center mt-3 gap-4">
          <button
            id="break-decrement"
            onClick={(e) => handleBreakSetup("break-decrement", e)}
            type="button"
            className={`${
              isTurnedOn ? " button-shadow-opacity " : " button-shadow "
            } button-shadow text-xl md:text-sm block text-textColor 
          p-5 md:p-4  mx-auto  transition-all hover:transition-all opacity-0  rounded-[8px]`}
          >
            <BiSolidDownArrow
              className={`${isTurnedOn ? " opacity-text" : " back-text "}`}
            />
          </button>
          <button
            id="break-increment"
            onClick={(e) => handleBreakSetup("break-increment", e)}
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
