"use client"

import { io } from "socket.io-client"
import { user } from "@/lib/placeholder-user"
import getDevice from "@/lib/getDevice"
import DeviceBox from "@/app/testing/components/DeviceBox"
import { Suspense, useEffect, useState } from "react"

export default function Testing() {
    const [socket, setSocket] = useState(null)
    const [devices, setDevices] = useState([])

    const setDeviceData = (deviceID, deviceData) => {
        setDevices((prevDevices) => {
            const deviceIndex = prevDevices.findIndex(
                (device) => device.did === deviceID
            )

            if (deviceIndex !== -1) {
                // Update the existing device data
                const updatedDevices = [...prevDevices]
                updatedDevices[deviceIndex] = deviceData
                return updatedDevices
            } else {
                // Add the new device to the state
                return [...prevDevices, deviceData]
            }
        })
    }

    const fetchDevices = async () => {
        const newDevices = await getDevice(user.uid)
        console.log(newDevices)
        setDevices(newDevices)
    }

    useEffect(() => {
        // Fetch devices from server for initial render
        fetchDevices()

        // Connect to WebSocket and specify event handlers
        const socketIO = io("ws://158.220.110.116:5000")
        setSocket(socketIO)

        socketIO.on("connect", () => {
            console.log("connected")
        })
        socketIO.on("disconnect", () => {
            console.log("disconnected")
        })
        socketIO.on("webMessage", (message) => {
            const messageParse = JSON.parse(message)
            console.log("webMessage received")
            console.log(messageParse)

            setDeviceData(messageParse.did, messageParse)
        })
    }, [])

    const handleDeviceChange = (deviceID, deviceData) => {
        console.log(deviceID + " is changed " + deviceData)
        const changedDeviceObj = [
            {
                did: deviceID,
                dn: devices.find((device) => device.did === deviceID).dn,
                dd: deviceData,
                uid: user.uid,
            },
        ]
        setDeviceData(deviceID, changedDeviceObj[0])
        if (socket) {
            console.log(
                "sending to webMessage" + JSON.stringify(changedDeviceObj)
            )
            socket.emit("webMessage", changedDeviceObj)
        } else {
            console.log("socket is not alive")
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

/*
Websocket objet: 
{
    "did": "123",
    "dn": "Desk",
    "dd": "deskLamp-b-0-0-1--deskLampBrightness-n-0-255-34--deskMonitor-b-0-0-0--",
    "uid": "1124"
}

SQL object:
{
    "did": "123",
    "dn": "Desk",
    "dd": "deskLamp-b-0-0-false--deskLampBrightness-n-0-255-58--deskMonitor-b-0-0-false--",
    "uid": "1124"
}
*/
