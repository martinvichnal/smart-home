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
import io from "socket.io-client"

export default function DevicePage() {
    const [socket, setSocket] = useState<any>()
    const [devices, setDevices] = useState<DeviceInterface[]>([]) // State for storing devices in array
    const userId = "1124" // Replace with the actual user ID
    const deviceId = "1001" // Replace with the actual device ID

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
    }

    useEffect(() => {
        console.log(devices)
        // socket.emit("webappMessage", {
        //     deviceId,
        //     message: JSON.stringify(devices),
        // })
    }, [devices])

    useEffect(() => {
        // Fetching devices
        const getDevices = async () => {
            const fetchedData = await getAllDevices()
            setDevices(fetchedData)
            // console.log(devices)
        }
        getDevices()

        const socketIO = io("ws://192.168.0.27:5000") // Connecting to websocket and handling messages events
        setSocket(socketIO)
        // Emit the "join" event when the component mounts
        socketIO.emit("join", userId, "webapp")
        const message = "Hello from the webapp!"
        const id = "webapp"
        socketIO.emit("webappMessage", { deviceId, message })

        // Handle incoming messages from the server
        socketIO.on("message", (message) => {
            console.log("Received message from server:", message)
        })

        // Clean up the socket connection when the component unmounts
        return () => {
            socketIO.disconnect()
        }
    }, [])

    return (
        <div>
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
        </div>
    )
}

// socket.on("connect", () => {
//     console.log("Successfully connected to the WebSocket server!")
// })
// socket.on("disconnect", () => {
//     console.log("Disconnected from the WebSocket server!")
// })
// // Listen for incoming messages
// socket.on("webMessage", (message) => {
//     // Handle messages from the device
//     // setMessages((prevMessages) => [...prevMessages, message])
// })
// socket.on("ackMessage", (message) => {
//     // Handle messages on acknowledgement from the device
//     // This is used to check if the device is recived the message or not
//     // setMessages((prevMessages) => [...prevMessages, message])
// })
