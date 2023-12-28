"use server"

import axios from "axios"
import { DeviceInterface } from "@/lib/interfaces"

export default async function postDeviceData(data: DeviceInterface) {
    console.log(`Update database: ${data.did} device data: ${data.dd}`)
    axios
        .put(`${process.env.API_SERVER_NAME}/api/devices/deviceDID`, {
            did: data.did,
            dd: data.dd + "--",
        })
        .then((response) => {
            console.log(response)
            return true
        })
        .catch((error) => {
            console.log(error)
            return false
        })
}
