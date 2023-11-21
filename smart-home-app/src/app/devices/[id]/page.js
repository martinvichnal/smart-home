"use client"

import { redirect } from "next/navigation"
import { data } from "@/lib/placeholder-data"
import DeviceBox from "@/components/DeviceBox"
import SideNav from "@/components/SideNav"
// import { useGetUserInfo } from "@/hooks/useGetUserInfo"
import { user } from "@/lib/placeholder-user"
import { useEffect } from "react"

export default function Devices({ params }) {
    // const { uIsAuth } = useGetUserInfo()
    console.log("user", user)
    const { id } = params
    console.log("id", id)

    return (
        <div
            className="flex h-screen flex-col md:flex-row md:overflow-hidden"
            id="devices"
        >
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex flex-wrap lg:justify-evenly md:justify-evenly sm:justify-center">
                {data.map((device) => (
                    <DeviceBox device={device} key={device.did} />
                ))}
            </div>
        </div>
    )
}
