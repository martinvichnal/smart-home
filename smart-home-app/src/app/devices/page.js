"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { data } from "@/lib/placeholder-data"
import DeviceBox from "@/components/DeviceBox"

export default function Devices() {
    const [devices, setDevices] = useState([])

    useEffect(() => {
        const getDeviceData = async () => {
            const query = await fetch("http://localhost:3001/api/devices")
            const response = await query.json()
            console.log("response from fetched API", response)
            setDevices(response.data)
        }
        getDeviceData()
    }, [])

    return (
        <div className="" id="devices">
            {/* <div className="grid grid-cols-3 gap-4 grid-flow-row justify-center items-center h-screen"> */}
            <div className="flex flex-wrap lg:justify-evenly md:justify-evenly sm:justify-center">
                {/* {data.map((device) => (
                    <DeviceBox device={device} key={device.did} />
                ))} */}
            </div>
        </div>
    )
}
