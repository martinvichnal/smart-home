export default async function getAllDevices() {
    const response = await fetch(`${process.env.API_SERVER_NAME}/api/devices`)
    if (!response.ok) throw new Error("The data could not be fetched")
    return response.json()
}
