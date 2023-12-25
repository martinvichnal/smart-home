"use client"

import { getAllDevices } from "@/actions/getAllDevices"
import DeviceBox from "@/components/DeviceBox"
// import { unstable_noStore as noStore } from "next/cache"1

import { Suspense, useEffect, useState } from "react"
import io from "socket.io-client"

type deviceProps = {
    did: string
    dn: string
    dd: string
    uid: string
}

export default async function Home() {
    const [devices, setDevices] = useState<deviceProps[]>([]) // State for storing devices in array

    // Getting all devices from the database via GET request
    const getDevices = async () => {
        const devices = await getAllDevices()
        setDevices(devices)
        console.log(devices)
    }

    const handleChanges = (data: deviceProps) => {
        // Handle changes in the devices
        // This is used to update the devices list when a new device is added or removed
    }

    useEffect(() => {
        // Fetching devices
        getDevices()

        // Connecting to websocket and handling messages events
        const socket = io("ws://192.168.0.28:5000")

        socket.on("connect", () => {
            console.log("Successfully connected to the WebSocket server!")
        })

        socket.on("disconnect", () => {
            console.log("Disconnected from the WebSocket server!")
        })

        // Listen for incoming messages
        socket.on("webMessage", (message) => {
            // Handle messages from the device
            // setMessages((prevMessages) => [...prevMessages, message])
        })

        socket.on("ackMessage", (message) => {
            // Handle messages on acknowledgement from the device
            // This is used to check if the device is recived the message or not
            // setMessages((prevMessages) => [...prevMessages, message])
        })

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div className="" id="devices">
            <div className="flex flex-wrap lg:justify-evenly md:justify-evenly sm:justify-center text-black">
                <Suspense fallback={<div>Loading...</div>}>
                    {devices.map((device: deviceProps) => (
                        <DeviceBox
                            key={device.did}
                            DID={device.did}
                            DN={device.dn}
                            DD={device.dd}
                            UID={device.uid}
                            onDeviceChange={handleChanges} // Add onDeviceChange property to DeviceBox component
                        />
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
