import { useEffect, useState, useRef } from "react";
import "./App.scss";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const inputReference = useRef(null);

  function changeTime(e) {
    setSeconds(+e.target.value);
  }

  function startCountdown() {
    setStarted(true);
    countDown();
  }

  function pauseCountdown() {
    setStarted(false);
    inputReference.current.focus();
    clearInterval(time);
  }

  function resetCountdown() {
    setSeconds(0);
    inputReference.current.focus();
    //  clearInterval(time);
  }

  useEffect(() => {
    if (seconds <= 0) {
      setStarted(false);
      clearInterval(time);
    }
    inputReference.current.focus();
  }, [seconds, started, time]);

  function countDown() {
    setTime(
      setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000)
    );
  }

  return (
    <div className={`App `}>
      <div className={`color-bg ${started ? "active" : ""}`}></div>
      <div className="text-block">
        <header className="text-block_heading">
          <h4>Time left: </h4>
          {/* {started && <h3> {seconds}</h3>} */}
          <input
            className="h3"
            onChange={changeTime}
            type="number"
            name="seconds"
            ref={inputReference}
            value={seconds}
            disabled={started ? "disabled" : ""}
          />
        </header>

        <div className="btn-group">
          <button
            onClick={startCountdown}
            style={{ display: started ? "none" : "inline-block" }}
            type="button"
            className="btn btn-start"
          >
            Start{" "}
          </button>
          <button
            onClick={pauseCountdown}
            style={{ display: started ? "inline-block" : "none" }}
            type="button"
            className="btn btn-pause"
          >
            Pause
          </button>
          <button
            onClick={resetCountdown}
            style={{ display: started ? "none" : "inline-block" }}
            type="button"
            className="btn btn-reset"
          >
            Reset{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
