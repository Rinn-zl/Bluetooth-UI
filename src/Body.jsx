import { useState } from "react"

function Body() {
    const [temperature, setTemperature] = useState(0)

    return(
    <div className="text-center ">
        <p className="text-sm text-gray-500">Temperature</p>
        <p className="text-xl font-medium">{temperature}</p>
    </div>
    )
}
export default Body