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
import { Display } from "./Display/Display.jsx";
import { ControlePanell } from "./ControlePanell/ControlePanell";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isRunning = useSelector(getIsRunning);
  const isTurnedOn = useSelector(getIsTurnedOn);

  const togglePower = () => {
    dispatch(toggleIsTurnedOn());
    dispatch(toggleIsRunning());
  };

  const onBtnClickToggleStyles = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const pressedBtn = e.target as HTMLElement;
    const audioElement = pressedBtn?.querySelector("audio") as HTMLAudioElement | null;

    dispatch(toggleIsPressed());

    if (audioElement && isTurnedOn) {
      audioElement.currentTime = 0;
      audioElement?.play();
    }

    if (pressedBtn.classList.contains("controle-paneell-btn")) {
      if (!isRunning && isTurnedOn) pressedBtn.classList.add("controle-btn-pressed");
      if (isRunning) pressedBtn.classList.remove("controle-btn-pressed");
    }

    pressedBtn.classList.add("pressed");

    setTimeout(() => {
      dispatch(toggleIsPressed());

      pressedBtn.classList.remove("pressed");
      if (pressedBtn.id === "reset") pressedBtn.classList.remove("controle-btn-pressed");
    }, 100);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onBtnClickToggleStyles(e);
  };

  return (
    <div className=" pt-6 md:pt-8   mx-auto flex flex-col relative">
      <div className=" flex  mx-auto items-center justify-center gap-28 md:gap-12 transition-all">
        <BreakController onBtnClick={handleClick} />
        <SessionController onBtnClick={handleClick} />
      </div>
      <Display />
      <ControlePanell onBtnClick={handleClick} />
      <div className="box-shadow p-2 pt-4 px-4 absolute -bottom-24 left-1/2 transform -translate-x-1/2">
        <div className=" checkbox-wrapper-25 mx-auto">
          <input onClick={togglePower} type="checkbox" />
        </div>
      </div>
    </div>
  );
};
