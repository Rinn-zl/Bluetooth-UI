import { FiPower } from "react-icons/fi";
function Topbar({ togglePower }) {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">SMART FAN CONTROLLER</h2>
      <div className="flex gap-2">
        <button
          onClick={togglePower}
          // className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-500 text-xs text-white transition"
          className="px-5 py-2 rounded-full font-medium text-white shadow-lg transition bg-red-600 hover:bg-red-500 shadow-red-500/40"
        >
          <FiPower size={20} />
        </button>
        {/* <button className="px-3 py-1 rounded-md bg-zinc-700 hover:bg-zinc-600 text-xs text-white transition">
          MORE
        </button> */}
      </div>
    </div>
  );
}

export default Topbar;
