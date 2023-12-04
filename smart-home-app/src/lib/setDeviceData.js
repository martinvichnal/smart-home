import axios from "axios"

export default async function setDeviceData(deviceID, data) {
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
