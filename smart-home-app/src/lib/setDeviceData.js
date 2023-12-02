import axios from "axios"

export default async function setDeviceData(deviceID, data) {
    axios
        .put(`${process.env.API_SERVER_NAME}/api/devices/device`, {
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
