"use client"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function Testing() {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socketIO = io("ws://192.168.0.53:5000")
        setSocket(socketIO)

        socketIO.on("connect", () => {
            console.log("connected")
        })
        socketIO.on("disconnect", () => {
            console.log("disconnected")
        })
        socketIO.on("webMessage", (message) => {
            console.log("A message appeared on deviceMessage: " + message)
        })
        socketIO.on("deviceMessage", (message) => {
            console.log("A message appeared on deviceMessage: " + message)
        })
    }, [])

    const sendMessage = (messageType, message) => {
        if (socket) {
            socket.emit(messageType, message)
        }
    }

    return (
        <div>
            <div>
                <button
                    id="sendWebMessage"
                    onClick={() => sendMessage("webMessage", "web data")}
                >
                    Send Web Message
                </button>
            </div>
            <br />
            <div>
                <button
                    id="sendDeviceMessage"
                    onClick={() => sendMessage("deviceMessage", "device data")}
                >
                    Send Device Message
                </button>
            </div>
        </div>
    )
}
