"use client"
import { user } from "@/lib/placeholder-user"
import DeviceBox from "@/app/devices/components/DeviceBox"
import getDevice from "@/lib/getDevice"
import { Suspense, useEffect, useState } from "react"

export default function Devices() {
    const [devices, setDevices] = useState([])

    const fetchDevices = async () => {
        const newDevices = await getDevice(user.uid)
        setDevices(newDevices)
    }

    useEffect(() => {
        // fetchDevices()
        const intervalId = setInterval(fetchDevices, 5000) // Fetch every 5 seconds

        // Clean up the interval on unmount
        return () => clearInterval(intervalId)
    }, [])

    const handleDeviceChange = (deviceID) => {
        console.log(deviceID + " is changed... Fetching new devices...")
        fetchDevices()
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
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://your-server-url');

        socket.onmessage = (event) => {
            const newDevices = JSON.parse(event.data);
            setDevices(newDevices);
        };

        // Clean up the WebSocket connection on unmount
        return () => socket.close();
    }, []);
*/
