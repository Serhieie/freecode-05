import { BreakController } from "./BreakController/BreakController.jsx";
import { SessionController } from "./SessionController/SessionController.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useCountdown } from "../hooks/useCountDown";
import {
  getIsPressed,
  getIsTurnedOn,
  toggleIsPressed,
  toggleIsTurnedOn,
  getBreakTime,
  toggleStarted,
  getSessionTime,
} from "../redux/timerSlice";
import { Display } from "./Display/Display.jsx";
import { ControlePanell } from "./ControlePanell/ControlePanell";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isTurnedOn = useSelector(getIsTurnedOn);
  const isPressed = useSelector(getIsPressed);
  const breakTime = useSelector(getBreakTime);
  const sessionTime = useSelector(getSessionTime);
  const timeForSession = useCountdown();

  const togglePower = () => {
    dispatch(toggleIsTurnedOn());
  };

  const onBtnClickToggleStyles = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const pressedBtn = e.target as HTMLElement;
    const audioElement = pressedBtn?.querySelector("audio") as HTMLAudioElement | null;
    if (isPressed) return;
    dispatch(toggleIsPressed());
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement?.play();
    }
    if (pressedBtn.classList.contains("controle-paneell-btn") && !isPressed) {
      pressedBtn.classList.add("controle-btn-pressed");
    } else if (!isPressed) {
      pressedBtn.classList.add("pressed");
    }
    setTimeout(() => {
      dispatch(toggleIsPressed());
      pressedBtn.classList.remove("controle-btn-pressed", "pressed");
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
      <Display timeForSession={timeForSession} />
      <ControlePanell onBtnClick={handleClick} />
      <div className="box-shadow p-2 pt-4 px-4 absolute -bottom-24 left-1/2 transform -translate-x-1/2">
        <div className=" checkbox-wrapper-25 mx-auto">
          <input onClick={togglePower} type="checkbox" />
        </div>
      </div>
    </div>
  );
};
