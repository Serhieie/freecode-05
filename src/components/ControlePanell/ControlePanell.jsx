import { HiMiniPlayPause } from "react-icons/hi2";
import { FaRepeat } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useTimer } from "../../hooks/useCountDown";
import { getIsTurnedOn, getSessionTime } from "../../redux/timerSlice";

export const ControlePanell = ({ onBtnClick }) => {
  const isTurnedOn = useSelector(getIsTurnedOn);
  const sessionTime = useSelector(getSessionTime);
  const { startPause, reset } = useTimer();

  const resetBtn = document.querySelector("#start_stop");

  const handleReset = (e) => {
    onBtnClick(e);
    if (!isTurnedOn) return;
    reset();
    resetBtn?.classList.remove("controle-btn-pressed");
  };

  const startTimer = (e) => {
    onBtnClick(e);
    if (!isTurnedOn) return;
    if (sessionTime !== 0) {
      startPause();
    }
  };

  return (
    <div
      id="break-label"
      className="box-shadow flex gap-4  mx-auto mt-10  md:mt-6  py-6 md:py-5 px-16 md:px-10"
    >
      <button
        id="start_stop"
        onClick={(e) => {
          startTimer(e);
        }}
        type="button"
        className={`${
          isTurnedOn ? " controle-paneell-btn-opacity " : "  "
        }  p-4 md:p-2 w-24 md:w-20 flex 
      justify-center items-center controle-paneell-btn`}
      >
        <HiMiniPlayPause className={`${isTurnedOn ? " opacity-text" : " back-text "}`} />
      </button>
      <button
        id="reset"
        onClick={(e) => handleReset(e)}
        type="button"
        className={`${
          isTurnedOn ? " controle-paneell-btn-opacity " : "  "
        }  p-4 md:p-2 w-24 md:w-20 flex 
      justify-center items-center controle-paneell-btn`}
      >
        <FaRepeat className={`${isTurnedOn ? " opacity-text" : " back-text "}`} />
      </button>
    </div>
  );
};
