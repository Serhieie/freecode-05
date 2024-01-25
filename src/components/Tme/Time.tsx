import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsTurnedOn, getTime, setTime } from "../../redux/timerSlice";

export const Time = () => {
  const dispatch = useDispatch();
  const isTurnedOn = useSelector(getIsTurnedOn);
  const time = useSelector(getTime);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
      dispatch(setTime(formattedTime));
    };
    const itrvl = setInterval(updateClock, 1000);
    return () => clearInterval(itrvl);
  }, [dispatch]);

  return (
    <div
      className={`
          font-arcade rounded-xl
     text-mainOrange  md:text-2xl time-shadow text-6xl m-0 h-12 md:h-8 md:w-32 smallScreen:w-64 py-2 flex 
     justify-center items-center text-center`}
    >
      <p
        className={`
         
          m-0 p-0 mt-4 md:mt-2 text-center`}
      >
        {time}
      </p>
    </div>
  );
};
