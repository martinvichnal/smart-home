import { getAllDevices } from "@/actions/getAllDevices"
import DeviceBox from "@/components/DeviceBox"
import { unstable_noStore as noStore } from "next/cache"

import { Suspense } from "react"

type deviceProps = {
    did: string
    dn: string
    dd: string
    uid: string
}

export default async function Home() {
    noStore()
    // fetch devices
    const devices = await getAllDevices()
    console.log(devices)
    console.log(`${process.env.API_SERVER_IP}/api/devices`)

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
                        />
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
