import { BreakController } from "./BreakController/BreakController.jsx";
import { SessionController } from "./SessionController/SessionController.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsRunning,
  getIsTurnedOn,
  toggleIsPressed,
  toggleIsRunning,
  toggleIsTurnedOn,
} from "../redux/timerSlice";
import { Display } from "./Display/Display";
import { ControlePanell } from "./ControlePanell/ControlePanell";
import { Time } from "../components/Tme/Time";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isRunning = useSelector(getIsRunning);
  const isTurnedOn = useSelector(getIsTurnedOn);

  //power off its just visual effect for practice
  const togglePower = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/switch.mp3`);
    dispatch(toggleIsTurnedOn());
    dispatch(toggleIsRunning());
    audio.play();
  };

  //toggle push styles for buttons and timeout to take out these styles isPressed state too fast
  const onBtnClickToggleStyles = (e: React.MouseEvent<HTMLButtonElement>): void => {
    //getting elements
    const pressedBtn = e.target as HTMLElement;
    const audioElement = pressedBtn?.querySelector("audio") as HTMLAudioElement | null;

    dispatch(toggleIsPressed());

    //clip sound when pressing button adn timer is turned on
    if (audioElement && isTurnedOn) {
      audioElement.currentTime = 0;
      audioElement?.play();
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
      dispatch(toggleIsPressed());
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
          <input onClick={togglePower} type="checkbox" checked={!isTurnedOn} />
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
