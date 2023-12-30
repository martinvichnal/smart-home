/*
This is the main page.
Client component.
Responsible for websocket connections.
*/

"use client"

import { useEffect, useState } from "react"
import { Suspense } from "react"
import { DeviceInterface } from "@/lib/interfaces"
import { getAllDevices } from "@/actions/getAllDevices"
import RenderDevice from "./components/RenderDevice"
import postDeviceData from "@/actions/postDeviceData"
// import WebSocketProvider, { useWebSocket } from "@/app/WebSocketProvider"
import { io, Socket } from "socket.io-client"

export default function DevicePage() {
    const [devices, setDevices] = useState<DeviceInterface[]>([]) // State for storing devices in array
    const [socket, setSocket] = useState<Socket | null>(null) // State for storing socket connection
    // const { socket } = useWebSocket()

    // Broadcast message to the device. PROP: stringified Device Data
    const handleDeviceChange = ({ did, dn, dd, uid }: DeviceInterface) => {
        // Creating a device object
        const updatedDevice = {
            did,
            dn,
            dd,
            uid,
        }
        // Setting the device state
        setDevices((prevDevices) => {
            return prevDevices.map((device) => {
                if (device.did === did) {
                    return updatedDevice
                }
                return device
            })
        })
        postDeviceData(updatedDevice)
        socket?.emit("webappMessage", `${did}`, JSON.stringify(updatedDevice))
    }

    useEffect(() => {
        // console.log("devices: " + devices)
    }, [devices])

    useEffect(() => {
        // Fetching devices
        const getDevices = async () => {
            const fetchedData = await getAllDevices()
            setDevices(fetchedData)
            // console.log(devices)
        }
        getDevices()

        // Connecting to websocket and handling messages events
        const socketIO = io("ws://192.168.0.27:5000")
        setSocket(socketIO)
        // Join the server
        socketIO.emit("join", "1124", "webapp", "webapp")

        return () => {
            socketIO.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket) {
            // Listen for messages
            socket.on("message", (message) => {
                console.log("Received message:", message)
            })
            socket.on("connectionStatus", (message) => {
                console.log("Received connectionStatus message:", message)
            })
        }
        return () => {
            socket?.disconnect()
        }
    }, [socket])

    return (
        <div>
            {/* <WebSocketProvider> */}
            <div className=" grid xl:grid-cols-2 lg:grid-cols-1">
                <Suspense fallback={<div>Loading...</div>}>
                    {devices.map((device: DeviceInterface) => (
                        <RenderDevice
                            key={device.did}
                            did={device.did}
                            dn={device.dn}
                            dd={device.dd}
                            uid={device.uid}
                            onDeviceChange={handleDeviceChange}
                        />
                    ))}
                </Suspense>
            </div>
            {/* </WebSocketProvider> */}
        </div>
    )
}
