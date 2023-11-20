import axios from "axios"

const baseUrl = "http://localhost:3001/api/devices"

export const getDevice = async () => {
    const response = await axios.get(`${baseUrl}`)
    return response.data
    console.log(response.data)
}
