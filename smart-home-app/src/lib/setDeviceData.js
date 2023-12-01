import axios from "axios"

export default async function setDeviceData(deviceID, data) {
    axios
        .put("http://192.168.0.53:8080/api/devices/device", {
            did: deviceID,
            dd: data + "--",
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}
