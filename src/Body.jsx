import { useEffect, useMemo, useState } from "react";
import { FiPower } from "react-icons/fi"; // Power icon from react-icons

const MIN = 0;
const MAX = 100;

const radius = 120;
const stroke = 14;
const SIZE = radius * 2 + stroke * 2;
const CX = SIZE / 2;
const CY = SIZE / 2;

// ---- Geometry helpers ----
const deg2rad = (deg) => (Math.PI / 180) * deg;
const polarToCartesian = (cx, cy, r, angle) => ({
  x: cx + r * Math.cos(deg2rad(angle)),
  y: cy + r * Math.sin(deg2rad(angle)),
});
const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

function Body() {
  const [setpoint, setSetpoint] = useState(50);
  const [currentTemp, setCurrentTemp] = useState(72);
  const [mode, setMode] = useState("auto"); // "auto" | "manual"
  const [power, setPower] = useState(true);
  const [spin, setSpin] = useState(false); // false = OFF, true = ON
  const [timer, setTimer] = useState(0); // in minutes

  // Simulate room temperature drift
  useEffect(() => {
    if (mode === "auto" && power) {
      const id = setInterval(() => {
        setCurrentTemp((t) => {
          const outside = 73;
          return Math.round((t + Math.sign(outside - t) * 0.1) * 10) / 10;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [mode, power]);

  // HVAC Action
  const hvacAction = useMemo(() => {
    if (!power) return "off";
    if (mode === "manual") return "idle";
    if (currentTemp > 75) return "cooling";
    if (currentTemp < 68) return "heating";
    return "idle";
  }, [mode, currentTemp, power]);

  // Gauge sweep
  const startAngle = -250;
  const endAngle = 70;
  const percent =
    mode === "manual"
      ? (setpoint - MIN) / (MAX - MIN)
      : (currentTemp - MIN) / (MAX - MIN);
  const arcAngle = startAngle + (endAngle - startAngle) * percent;

  // Handlers
  const change = (delta) =>
    setSetpoint((sp) => clamp(sp + delta, MIN, MAX));

  const cycleMode = () =>
    setMode((m) => (m === "auto" ? "manual" : "auto"));

  const togglePower = () => setPower((p) => !p);

  const toggleSpin = () => setSpin((s) => !s);

  const increaseTimer = () => setTimer((t) => t + 5);
  const decreaseTimer = () => setTimer((t) => Math.max(0, t - 5));

  return (
    <div
      className={`w-full h-[560px] flex flex-col items-center justify-center transition-opacity ${
        power ? "opacity-100" : "opacity-50"
      }`}
    >
      {/* Dial */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block mx-auto"
        >
          {/* Background arc */}
          <path
            d={describeArc(CX, CY, radius, startAngle, endAngle)}
            stroke="#333"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
          />
          {/* Progress arc (hide if at 0%) */}
          {percent > 0 && (
            <path
              d={describeArc(CX, CY, radius, startAngle, arcAngle)}
              stroke={mode === "auto" ? "#38bdf8" : "#fbbf24"}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Center number */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-[64px] leading-none font-light text-zinc-100 font-mono">
            {currentTemp}°
          </div>
          <div className="mt-1 text-xs text-zinc-500 uppercase tracking-widest">
            {mode === "manual" ? `Setpoint: ${setpoint}` : "Current Temp"}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-8">
        <button
          onClick={() => change(-25)}
          disabled={mode === "auto" || !power}
          className={`h-12 w-12 rounded-full border border-zinc-600 text-2xl font-bold transition
            ${
              mode === "auto" || !power
                ? "bg-zinc-600/50 cursor-not-allowed text-zinc-400"
                : "bg-gradient-to-r from-amber-600 to-amber-400 text-white hover:scale-105"
            }`}
        >
          −
        </button>
        <button
          onClick={() => change(25)}
          disabled={mode === "auto" || !power}
          className={`h-12 w-12 rounded-full border border-zinc-600 text-2xl font-bold transition
            ${
              mode === "auto" || !power
                ? "bg-zinc-600/50 cursor-not-allowed text-zinc-400"
                : "bg-gradient-to-r from-amber-600 to-amber-400 text-white hover:scale-105"
            }`}
        >
          +
        </button>
      </div>

      {/* Extra Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {/* Power button with icon */}
        {/* <button
          onClick={togglePower}
          className={`px-6 py-2 rounded-full font-medium text-white shadow-lg transition
            ${power ? "bg-red-600 hover:bg-red-500 shadow-red-500/40" : "bg-green-600 hover:bg-green-500 shadow-green-500/40"}`}
        >
          <FiPower size={20} />
        </button> */}

        {/* Mode */}
        <button
          onClick={cycleMode}
          disabled={!power}
          className={`px-6 py-2 rounded-full font-medium text-white shadow-lg transition
            ${mode === "auto"
              ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/40"
              : "bg-amber-500 hover:bg-amber-400 shadow-amber-400/40"
            } ${!power ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {mode === "auto" ? "Auto Mode" : "Manual Mode"}
        </button>

        {/* Spin ON/OFF */}
        <button
          onClick={toggleSpin}
          disabled={!power}
          className={`px-6 py-2 rounded-full font-medium text-white shadow-lg transition
            ${spin ? "bg-purple-600 hover:bg-purple-500 shadow-purple-500/40" : "bg-gray-600 hover:bg-gray-500 shadow-gray-500/40"} ${!power ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Spin: {spin ? "ON" : "OFF"}
        </button>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseTimer}
            disabled={!power}
            className="h-10 w-10 rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40"
          >
            −
          </button>
          <span className="text-white text-sm">
            Timer: {timer} min
          </span>
          <button
            onClick={increaseTimer}
            disabled={!power}
            className="h-10 w-10 rounded-full bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 text-xs text-zinc-400">
        {!power
          ? "System is powered off"
          : mode === "manual"
          ? "Manual: adjust with + / −"
          : hvacAction === "heating"
          ? "Auto: Heating..."
          : hvacAction === "cooling"
          ? "Auto: Cooling..."
          : "Auto: Idle"}
      </div>
    </div>
  );
}

export default Body;
