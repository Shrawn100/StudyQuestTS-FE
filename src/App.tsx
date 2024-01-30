import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Timer from "./components/Timer";

export type Phase = {
  isActive: boolean;
  startTime: number;
  sessionsCompleted?: number;
};
export interface PomodoroPhases {
  studying: Phase;
  shortBreak: Phase;
  longBreak: Phase;
  counter: number;
}

const App: React.FC = () => {
  const [pomodoroPhases, setPomodoroPhases] = useState<PomodoroPhases>({
    studying: {
      isActive: true,
      startTime: 5,
      sessionsCompleted: 0,
    },
    shortBreak: {
      isActive: false,
      startTime: 6,
    },
    longBreak: {
      isActive: false,
      startTime: 15 * 60,
    },
    counter: 10,
  });

  const handlePhaseClick = (phaseName: keyof PomodoroPhases) => {
    setPomodoroPhases((prev) => ({
      ...prev,
      studying: { ...prev.studying, isActive: phaseName === "studying" },
      shortBreak: { ...prev.shortBreak, isActive: phaseName === "shortBreak" },
      longBreak: { ...prev.longBreak, isActive: phaseName === "longBreak" },
    }));
  };
  //Instead of having all different types of startBreakTime and etc. I can just have one timer. Then I can check what the pomodoro state is
  //Depending on that I can insert different values into the timer?

  return (
    <div className="home-container">
      <button onClick={() => handlePhaseClick("studying")}>Study</button>
      <button onClick={() => handlePhaseClick("shortBreak")}>ShortBreak</button>
      <button onClick={() => handlePhaseClick("longBreak")}>LongBreak</button>
      <Timer
        pomodoroPhases={pomodoroPhases}
        setPomodoroPhases={setPomodoroPhases}
      />
    </div>
  );
};

export default App;
