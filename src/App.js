import { useState } from "react";
import "./App.css";

function App() {
  let timepass = 0;
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);

  function changeTime(e) {
    setSeconds(+e.target.value);
  }

  function startCountdown() {
    setStarted(true);
    countDown();
  }

  function pauseCountdown() {
    setStarted(false);
    clearInterval(time);
  }

  function resetCountdown() {
    setSeconds(0);
  }

  function decrease() {
    timepass = timepass + 1;
    console.log("paso el contador decrease", timepass);
    setSeconds((prevSeconds) => prevSeconds - 1);
    // setSeconds(seconds - 1);
    // Number(seconds)
    if (seconds === timepass) {
      console.log("finalizar");
      clearInterval(time);
    }
  }

  function countDown() {
    setTime(setInterval(decrease, 1000));
  }

  return (
    <div className="App">
      <div>
        <div>Time: {seconds}</div>

        <input
          onChange={changeTime}
          type="number"
          name="seconds"
          value={seconds}
          disabled={started ? "disabled" : ""}
        />
        <div>
          <button
            onClick={startCountdown}
            style={{ display: started ? "none" : "inline-block" }}
            type="button"
          >
            Start{" "}
          </button>
          <button
            onClick={pauseCountdown}
            style={{ display: started ? "inline-block" : "none" }}
            type="button"
          >
            Pause
          </button>
          <button
            onClick={resetCountdown}
            style={{ display: started ? "none" : "inline-block" }}
            type="button"
          >
            Reset{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
