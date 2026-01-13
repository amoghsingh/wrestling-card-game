import { Link } from "react-router-dom";
import useToaster from "../../hooks/useToaster";
import "./style.scss";
import { useState } from "react";

const Home = () => {
  const { NotificationComponent, triggerNotification } = useToaster();
  const [time, setTime] = useState("1:00");
  const [disableButton, setDisableButton] = useState(false);

  const startTimer = (seconds: number) => {
    setDisableButton(true);
    let timer;
    if (!timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timer);
        alert("Times up!");
        setDisableButton(false);
      } else {
        --seconds;
        setTime("00:" + seconds.toString());
      }
    }, 1000);
  };

  return (
    <>
      <div className="bg"></div>
      <div className="home-text">
        <p>It's time to play the Game..</p>
        <p>{time}</p>
        <div>
          <Link to="/dashboard">Start Game</Link>
        </div>
        <div
          style={{ color: "#fff" }}
          onClick={() => {
            triggerNotification({
              message: "Files updated!",
              type: "success",
              duration: 3000,
            });
          }}
        >
          Trigger
        </div>
        <button
          disabled={disableButton}
          onClick={() => {
            startTimer(5);
          }}
        >
          Start Timer
        </button>
        {NotificationComponent}
      </div>
    </>
  );
};

export default Home;
