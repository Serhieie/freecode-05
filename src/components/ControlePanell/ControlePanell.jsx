import { HiMiniPlayPause } from "react-icons/hi2";
import { FaRepeat } from "react-icons/fa6";
import clickSound from "../../sounds/perc-808.mp3";
import { useDispatch, useSelector } from "react-redux";
import { getIsPressed, getIsTurnedOn, resetState } from "../../redux/timerSlice";

export const ControlePanell = ({ onBtnClick }) => {
  const dispatch = useDispatch();
  const isTurnedOn = useSelector(getIsTurnedOn);
  const isPressed = useSelector(getIsPressed);

  const handleReset = (e) => {
    dispatch(resetState());
    onBtnClick(e);
  };

  return (
    <div
      id="break-label"
      className="box-shadow flex gap-4  mx-auto mt-12 md:mt-8 py-6 md:py-5 px-16 md:px-10"
    >
      <button
        id="start_stop"
        onClick={onBtnClick}
        type="button"
        className={`${
          isTurnedOn ? " controle-paneell-btn-opacity " : "  "
        }  p-4 md:p-2 w-24 md:w-20 flex 
      justify-center items-center controle-paneell-btn`}
      >
        <audio className="clip" src={clickSound}></audio>
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
        <audio className="clip" src={clickSound}></audio>
        <FaRepeat className={`${isTurnedOn ? " opacity-text" : " back-text "}`} />
      </button>
    </div>
  );
};
