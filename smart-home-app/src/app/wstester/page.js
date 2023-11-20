"use client"
import { useState, useEffect } from "react"
import socketIO from "socket.io-client"
// const socket = socketIO.connect("http://localhost:4000")

function App() {
    const [room, setRoom] = useState("")
    return (
        <div>
            <p>Hello World!</p>
        </div>
    )
}

export default App
