"use client"

import { io } from "socket.io-client"
import DeviceBox from "@/app/devices/components/DeviceBox"
import { Suspense, useEffect, useState } from "react"

export default function Testing() {
    const [socket, setSocket] = useState(null)
    const [devices, setDevices] = useState([])

    useEffect(() => {
        const socketIO = io("ws://158.220.110.116:5000")
        setSocket(socketIO)

        socketIO.on("connect", () => {
            console.log("connected")
        })
        socketIO.on("disconnect", () => {
            console.log("disconnected")
        })
        socketIO.on("webMessage", (message) => {
            setDevices(message)
            console.log(message)
        })
    }, [])

    const sendMessage = (messageType, message) => {
        if (socket) {
            socket.emit(messageType, message)
        }
    }
    const handleDeviceChange = (deviceID) => {
        if (socket) {
            console.log("sending ")
            // socket.emit("webMessage", deviceID)
        }
    }

    return (
        <div className="" id="devices">
            <div className="flex flex-wrap lg:justify-evenly md:justify-evenly sm:justify-center">
                <Suspense fallback={<div>Loading...</div>}>
                    {devices.map((device) => (
                        <DeviceBox
                            device={device}
                            key={device.DID}
                            onDeviceChange={handleDeviceChange}
                        />
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
