export async function getUserDevices(userID: string) {
    try {
        console.log("Fetching device from user: ", userID)
        const response = await fetch(
            `${process.env.API_SERVER_NAME}/api/devices/deviceUID?uid=${userID}`
        )
        console.log(
            "Fetching device from:",
            `${process.env.API_SERVER_NAME}/api/devices/deviceUID?uid=${userID}`
        )
        return response.json()
    } catch (error) {
        console.error(
            `ERROR - Cannot fetching devices from server ${process.env.API_SERVER_IP}:`,
            error
        )
        throw error
    }
}
