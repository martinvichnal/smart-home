// WebSocketProvider.tsx
"use client"
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react"
import { io, Socket } from "socket.io-client"

interface WebSocketProviderProps {
    children: ReactNode
}

interface WebSocketContextProps {
    socket: Socket | null
}

const WebSocketContext = createContext<WebSocketContextProps>({ socket: null })

export const useWebSocket = () => {
    return useContext(WebSocketContext)
}

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null)

    useEffect(() => {
        const newSocket = io("ws://192.168.0.27:5000") // Replace with your Socket.IO server URL
        setSocket(newSocket)

        // Join the server
        newSocket.emit("join", "1124", "webapp", "webapp")

        return () => {
            newSocket.disconnect()
        }
    }, [])

    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export default WebSocketProvider
