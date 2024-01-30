import React, { useEffect, useState } from "react";
import { Phase, PomodoroPhases } from "../App";
interface Props {
  pomodoroPhases: PomodoroPhases;
  setPomodoroPhases: React.Dispatch<React.SetStateAction<PomodoroPhases>>;
}

const Timer: React.FC<Props> = ({ pomodoroPhases, setPomodoroPhases }) => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [countDownStarted, setCountDownStarted] = useState<boolean>(false);

  useEffect(() => {
    const activePhase: Phase = Object.values(pomodoroPhases).find(
      (phase) => phase.isActive
    );
    setTimeLeft(activePhase.startTime);
    setCountDownStarted(false);
  }, [pomodoroPhases]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (timeLeft > 0 && countDownStarted) {
      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft <= 0 && countDownStarted) {
      setCountDownStarted(false);
      setPomodoroPhases((prev) => {
        let nextPhase: keyof PomodoroPhases = "studying";

        if (prev.studying.isActive) {
          if (prev.counter % 8 === 0) {
            nextPhase = "longBreak";
          } else {
            nextPhase = "shortBreak";
          }
        }

        return {
          ...prev,
          counter: prev.counter + 1,
          studying: {
            ...prev.studying,
            isActive: nextPhase === "studying",
          },
          shortBreak: {
            ...prev.shortBreak,
            isActive: nextPhase === "shortBreak",
          },
          longBreak: {
            ...prev.longBreak,
            isActive: nextPhase === "longBreak",
          },
        };
      });
    }
    return () => clearInterval(timerInterval);
  });

  return (
    <div>
      <div>Time Left: {timeLeft}</div>
      <button
        onClick={() => {
          setCountDownStarted(!countDownStarted);
        }}
      >
        Start/Stop
      </button>
    </div>
  );
};

export default Timer;
