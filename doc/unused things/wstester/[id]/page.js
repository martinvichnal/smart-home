"use client"
import { useState, useEffect } from "react"
import socketIO from "socket.io-client"
// const socket = socketIO.connect("http://localhost:4000")
const NEW_MESSAGE_EVENT = "newMessage"
const SOCKET_SERVER_URL = "http://localhost:4000"

function App({ params }) {
    const [room, setRoom] = useState("")

    const useChat = (room) => {}
    return (
        <div>
            <p>Hello World! {params.id}</p>
        </div>
    )
}

export default App

// webninjadeveloper.com/react/build-a-react-js-socket-io-rooms-project-to-build-group-chat-app-using-node-js-in-jsx/
