export async function getAllDevices() {
    try {
        const response = await fetch(`${process.env.API_SERVER_IP}/api/devices`)
        return response.json()
    } catch (error) {
        console.error(
            `ERROR - Cannot fetching devices from server ${process.env.API_SERVER_IP}:`,
            error
        )
        throw error
    }
}
