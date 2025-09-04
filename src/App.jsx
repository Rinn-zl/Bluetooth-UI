import Topbar from "./Topbar";
import Body from "./Body";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-6">
      <div className="h-[650px] w-[360px] mx-auto shadow-lg p-6 rounded-xl bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600">
        <Topbar />
        <hr className="mb-2" />
        <Body />
      </div>
    </div>
  );
}

export default App;
