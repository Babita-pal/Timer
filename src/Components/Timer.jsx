import { useState, useRef } from "react";
import Button from "./Button";

function Timer() {
  const [hh, setHH] = useState(0);
  const [mm, setMM] = useState(0);
  const [ss, setSS] = useState(0);
  const [isTimer, setIsTimer] = useState(false);
  const totalSeconds = useRef(null);
  const intervalID = useRef(null);

  const handleStart = () => {
    if (hh === 0 && mm === 0 && ss === 0) return;
    setIsTimer(true);
    totalSeconds.current = hh * 3600 + mm * 60 + ss;
    intervalID.current = setInterval(() => {
      totalSeconds.current = totalSeconds.current - 1;
      setHH(Math.floor(totalSeconds.current / 3600));
      setMM(Math.floor((totalSeconds.current / 60) % 60));
      setSS(totalSeconds.current % 60);
    }, 1000);
  };

  const handleStop = () => {
    setIsTimer(false);
    clearInterval(intervalID.current);
  };

  const handleReset = () => {
    setIsTimer(false);
    clearInterval(intervalID.current);
    setHH(0);
    setMM(0);
    setSS(0);
  };

  return (
    <div className="flex justify-center items-center flex-col p-6 rounded-lg shadow-lg bg-gradient-to-br from-purple-500 to-pink-500">
      <div className="grid grid-cols-3 gap-4 w-72 mb-4">
        <input
          className="border border-black px-4 py-2 rounded-md text-center"
          type="number"
          placeholder="hh"
          value={hh}
          disabled={isTimer}
          onChange={(e) => setHH(Number(e.target.value))}
        />
        <input
          className="border border-black px-4 py-2 rounded-md text-center"
          type="number"
          placeholder="mm"
          value={mm}
          disabled={isTimer}
          onChange={(e) => setMM(Number(e.target.value))}
        />
        <input
          className="border border-black px-4 py-2 rounded-md text-center"
          type="number"
          placeholder="ss"
          value={ss}
          disabled={isTimer}
          onChange={(e) => setSS(Number(e.target.value))}
        />
      </div>
      <div className="space-x-4">
        <Button
          text="Start"
          handleClick={handleStart}
          color="bg-green-500 hover:bg-green-600"
        />
        <Button
          text="Stop"
          handleClick={handleStop}
          color="bg-red-500 hover:bg-red-600"
        />
        <Button
          text="Reset"
          handleClick={handleReset}
          color="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </div>
  );
}

export default Timer;
