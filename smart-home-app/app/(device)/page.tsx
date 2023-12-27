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

export default function DevicePage() {
    const [devices, setDevices] = useState<DeviceInterface[]>([]) // State for storing devices in array

    // Broadcast message to the device. PROP: stringified Device Data
    const handleDeviceChange = (deviceString: string) => {
        // EMITTING MESSAGE TO THE DEVICE
    }

    useEffect(() => {
        // Fetching devices
        const getDevices = async () => {
            console.log(`${process.env.API_SERVER_IP}/api/devices`)
            const fetchedData = await getAllDevices()
            setDevices(fetchedData)
            console.log(devices)
        }
        getDevices()

        // // Connecting to websocket and handling messages events
        // const socket = io("ws://192.168.0.28:5000")
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
        // // Clean up the socket connection on unmount
        // return () => {
        //     socket.disconnect()
        // }
    }, [])

    return (
        <div>
            <h1>Device Page</h1>
            {/* <RenderDevice onDeviceChange={handleDeviceChange} /> */}
            <div className="flex flex-wrap lg:justify-evenly md:justify-evenly sm:justify-center">
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
