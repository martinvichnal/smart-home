export default async function getDevice(userID) {
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
