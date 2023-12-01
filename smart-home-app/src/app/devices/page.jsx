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
        fetchDevices()
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
