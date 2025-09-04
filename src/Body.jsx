import { Flame, Snowflake } from "lucide-react";
import { useState } from "react";

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
  const [setpoint, setSetpoint] = useState(0);

  // Gauge sweep (choose the arc you want your progress to follow)
  const startAngle = -250;
  const endAngle = 70; // symmetric around -90°, leaves a small gap

  const percent = (setpoint - MIN) / (MAX - MIN);
  const arcAngle = startAngle + (endAngle - startAngle) * percent;


  const change = (delta) => setSetpoint((sp) => clamp(sp + delta, MIN, MAX));

  return (
    // Take most of the card height and center content vertically
    <div className="w-full h-[560px] flex flex-col items-center justify-center">
      {/* Dial container is perfectly square; we stack number over the SVG */}
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
          {/* Progress arc (hidden at 0) */}
          {setpoint > MIN && (
            <path
              d={describeArc(CX, CY, radius, startAngle, arcAngle)}
              stroke="#38bdf8"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Center label perfectly (no negative margins, no translates) */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-[64px] leading-none font-light text-zinc-100 font-mono">
            {setpoint}
         </div>

          <div className="mt-1 text-xs text-zinc-500 uppercase tracking-widest">
            Progress
          </div>
        </div>
      </div>

      {/* Controls centered under the dial */}
      <div className="mt-10 flex items-center justify-center gap-8">
        <button
          onClick={() => change(-1)}
          className="h-12 w-12 rounded-full border border-zinc-600 bg-zinc-700 text-zinc-100"
        >
          −
        </button>
        <button
          onClick={() => change(1)}
          className="h-12 w-12 rounded-full border border-zinc-600 bg-zinc-700 text-zinc-100"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Body;
