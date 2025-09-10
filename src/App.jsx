import { useState } from "react";
import Topbar from "./Topbar";
import Body from "./Body";

function FanHome({ togglePower }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-6">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6">SMART FAN CONTROLLER</h2>
      <p className="text-sm text-zinc-400 mb-8">Press power to start</p>

      {/* Fan figure */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-12">
        {/* Outer circle */}
        <div className="absolute w-48 h-48 rounded-full border-8 border-gray-600"></div>

        {/* Fan blades */}
        <div className="absolute w-32 h-32 animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-6 h-16 -ml-3 bg-gray-400 rounded-lg"></div>
          <div className="absolute bottom-0 left-1/2 w-6 h-16 -ml-3 bg-gray-400 rounded-lg"></div>
          <div className="absolute top-1/2 left-0 h-6 w-16 -mt-3 bg-gray-400 rounded-lg"></div>
          <div className="absolute top-1/2 right-0 h-6 w-16 -mt-3 bg-gray-400 rounded-lg"></div>
        </div>

        {/* Fan center */}
        <div className="w-12 h-12 bg-gray-700 rounded-full border-4 border-gray-500 z-10"></div>
      </div>

      {/* Power ON button */}
      <button
        onClick={togglePower}
        className="px-10 py-4 rounded-full bg-green-600 hover:bg-green-500 text-white font-semibold text-lg shadow-lg shadow-green-500/50 transition"
      >
        Power ON
      </button>
    </div>
  );
}

function App() {
  const [power, setPower] = useState(false);

  const togglePower = () => setPower((p) => !p);

  return power ? (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-6">
      <div className="h-[650px] w-[360px] mx-auto shadow-lg p-6 rounded-xl bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600">
        <Topbar togglePower={togglePower} />
        <hr className="mb-2" />
        <Body />
      </div>
    </div>
  ) : (
    <FanHome togglePower={togglePower} />
  );
}

export default App;
