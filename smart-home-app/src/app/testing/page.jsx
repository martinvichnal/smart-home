"use client"
import { useEffect } from "react"
import { io } from "socket.io-client"

export default function Testing() {
    useEffect(() => {
        const socket = io("ws://192.168.0.53:5000")
        socket.on("connect", () => {
            console.log("connected")
        })
        socket.on("disconnect", () => {
            console.log("disconnected")
        })
        socket.on("message", (message) => {
            console.log(message)
        })
        socket.emit("clientMessage", "Hello world!")

        socket.on("serverMessage", (message) => {
            console.log(message)
        })
    }, [])

    return <button id="sendButton">Send message</button>
}
