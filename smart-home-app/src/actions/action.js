"use server"

import axios from "axios"
import { revalidatePath } from "next/cache"

// const fetchDevices = async () => {
//     const newDevices = await getDevice(user.uid)
//     console.log(newDevices)
//     setDevices(newDevices)
// }

export async function fetchDevices() {
    const res = await fetch("https://api.example.com/devices")
    const devices = await res.json()
    return devices
}

export async function getAllDevices() {
    const response = await fetch(`${process.env.API_SERVER_NAME}/api/devices`)
    if (!response.ok) throw new Error("The data could not be fetched")
    return response.json()
}

export async function getDevice(userID) {
    console.log("Fetching device", userID)
    const response = await fetch(
        `${process.env.API_SERVER_NAME}/api/devices/deviceUID?uid=${userID}`
    )
    console.log(
        "Fetching device from:",
        `${process.env.API_SERVER_NAME}/api/devices/deviceUID?uid=${userID}`
    )
    // console.log(response)
    if (!response.ok) throw new Error("The data could not be fetched")
    return response.json()
}

export async function setDeviceData(deviceID, data) {
    console.log(`Update database: ${deviceID} device data: ${data}`)
    axios
        .put(`${process.env.API_SERVER_NAME}/api/devices/deviceDID`, {
            did: deviceID,
            dd: data + "--",
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
