import Body from "./Body"
import Topbar from "./Topbar"
function App() {

  return (
    <div className='h-screen max-w-md mx-auto shadow-lg p-6 bg-white rounded-xl bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600'>
      <Topbar/>
      <hr/>
      <Body/>
    </div>
  )
}

export default App
