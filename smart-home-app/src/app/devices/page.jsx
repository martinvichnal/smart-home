// "use client"
"use server"

// import { redirect } from "next/navigation"
import { user } from "@/lib/placeholder-user"
import DeviceBox from "@/app/devices/components/DeviceBox"
import getDevice from "@/lib/getDevice"
import { Suspense } from "react"
// import { useEffect } from "react"

export default async function Devices() {
    console.log(user.uid)
    const devices = await getDevice(user.uid)

    // console.log(allDevices)
    return (
        <div className="" id="devices">
            <div className="flex flex-wrap lg:justify-evenly md:justify-evenly sm:justify-center">
                <Suspense fallback={<div>Loading...</div>}>
                    {devices.map((device) => (
                        <DeviceBox device={device} key={device.DID} />
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
