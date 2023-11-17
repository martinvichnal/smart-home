import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { data } from "@/lib/placeholder-data"
import DeviceBox from "@/components/DeviceBox"

export default async function Devices() {
    const session = await getServerSession()
    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }

    return (
        <div className="" id="devices">
            <div className="grid grid-cols-3 gap-4 grid-flow-row justify-center items-center h-screen">
                {data.map((device) => (
                    <DeviceBox device={device} key={device.did} />
                ))}
            </div>
        </div>
    )
}
