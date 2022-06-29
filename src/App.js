import { useEffect, useState, useRef } from "react";
import "./App.scss";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [disableStart, setDisableStart] = useState(true);
  const inputSeconds = useRef(null);
  const [message, setMessage] = useState("");

  function changeTime(e) {
    if (seconds === "") {
      setMessage(null);
      setDisableStart(true);
    } else if (seconds !== "" && isNaN(seconds)) {
      setMessage("Please type a valid number");
      setDisableStart(true);
    } else {
      setDisableStart(false);
      setMessage(null);
    }

    setSeconds(e.target.value);
  }

  function startCountdown() {
    setStarted(true);
    countDown();
  }

  function pauseCountdown() {
    setStarted(false);
    inputSeconds.current.focus();
    clearInterval(time);
  }

  function resetCountdown() {
    setSeconds(0);
    inputSeconds.current.focus();
    setDisableStart(true);
    //  clearInterval(time);
  }

  useEffect(() => {
    if (seconds <= 0) {
      setStarted(false);
      setDisableStart(true);
      clearInterval(time);
    }
    inputSeconds.current.focus();
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
            ref={inputSeconds}
            value={seconds}
            disabled={started ? "disabled" : ""}
          />
          {message && <div className="message">{message}</div>}
        </header>

        <div className="btn-group">
          
          {!started && (
            <button
              onClick={startCountdown}
              type="button"
              className="btn btn-start"
              disabled={disableStart ? "disabled" : ""}
            >
              Start{" "}
            </button>
          )}

          {started && (
            <button
              onClick={pauseCountdown}
              style={{ display: started ? "inline-block" : "none" }}
              type="button"
              className="btn btn-pause"
            >
              Pause
            </button>
          )}

          {!started && (
            <button
              onClick={resetCountdown}
              // style={{ display: started ? "none" : "inline-block" }}
              type="button"
              className="btn btn-reset"
            >
              Reset{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
