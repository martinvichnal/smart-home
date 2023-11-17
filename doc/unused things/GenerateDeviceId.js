import { useEffect, useState } from "react"
import crypto from "crypto"

function generateDeviceId() {
    const navigatorInfo = window.navigator.userAgent + window.navigator.platform
    const timezoneOffset = new Date().getTimezoneOffset()
    const screenInfo = `${window.screen.width}${window.screen.height}${window.screen.colorDepth}`
    const deviceIdData = `${navigatorInfo}${pluginsInfo}${timezoneOffset}${screenInfo}${cameraInfo}`
    const hash = crypto.createHash("sha256")
    hash.update(deviceIdData)
    return hash.digest("hex")
}

function App() {
    const [deviceId, setDeviceId] = useState(null)

    useEffect(() => {
        setDeviceId(generateDeviceId())
    }, [])

    return (
        <div>
            <h1>Device ID generator</h1>
            <p>Device ID: {deviceId}</p>
            by J.Lopez
        </div>
    )
}

export default App
