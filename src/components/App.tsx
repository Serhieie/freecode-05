import { BreakController } from "./BreakController/BreakController.jsx";
import { SessionController } from "./SessionController/SessionController.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsRunning,
  getIsTurnedOn,
  toggleIsRunning,
  toggleIsTurnedOn,
} from "../redux/timerSlice";
import { Display } from "./Display/Display";
import { ControlePanell } from "./ControlePanell/ControlePanell";
import { Time } from "../components/Tme/Time";

export const App: React.FC = () => {
  const switchSound = require("../sounds/switch.mp3");
  const clickSound = require("../sounds/perc-808.mp3");
  const dispatch = useDispatch();
  const isRunning = useSelector(getIsRunning);
  const isTurnedOn = useSelector(getIsTurnedOn);

  //power off its just visual effect for practice
  const togglePower = () => {
    const audioSwitch = new Audio(`${switchSound}`);
    dispatch(toggleIsTurnedOn());
    dispatch(toggleIsRunning());
    audioSwitch.play();
  };

  //toggle push styles for buttons and timeout to take out these styles isPressed state too fast
  const onBtnClickToggleStyles = (e: React.MouseEvent<HTMLButtonElement>): void => {
    //getting elements
    const pressedBtn = e.target as HTMLElement;
    const audioclick = new Audio(`${clickSound}`);

    //clip sound when pressing button adn timer is turned on
    if (audioclick && isTurnedOn) {
      audioclick.currentTime = 0;
      audioclick?.play();
    }
    //add styles for controle pannel btns. There is playPause btn working with different logic
    // if its turned on an running its always at pressed state
    if (pressedBtn.classList.contains("controle-paneell-btn")) {
      if (!isRunning && isTurnedOn) pressedBtn?.classList.add("controle-btn-pressed");
      if (isRunning) pressedBtn?.classList.remove("controle-btn-pressed");
    }
    //simple btn was pressed styles
    pressedBtn?.classList.add("pressed");

    //timeout for removing styles from btns after pressing
    setTimeout(() => {
      pressedBtn?.classList.remove("pressed");
      if (pressedBtn.id === "reset") pressedBtn?.classList.remove("controle-btn-pressed");
    }, 100);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onBtnClickToggleStyles(e);
  };

  return (
    <div className=" pt-5 md:py-4   mx-auto flex flex-col relative">
      <div className=" flex  mx-auto items-center justify-center gap-28 md:gap-12 transition-all">
        <BreakController onBtnClick={handleClick} />
        <SessionController onBtnClick={handleClick} />
      </div>
      <Display />
      <ControlePanell onBtnClick={handleClick} />
      <div className="box-shadow p-2 pt-4 px-4  md:mt-6 mt-10 mx-auto  transform ">
        <div className=" checkbox-wrapper-25 mx-auto">
          <input onChange={togglePower} type="checkbox" checked={!isTurnedOn} />
        </div>
      </div>
      <div className="flex justify-between items-center px-4 md:mt-4">
        <Time />
        <p className=" text-center -bottom-28 right-10 md:text-xs">
          designed by Serhieie
        </p>
      </div>
    </div>
  );
};
