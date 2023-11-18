import { NextResponse } from "next/server"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const searchParamsObj = Object.fromEntries(searchParams.entries())
    // console.log("searchParamsObj: ", searchParamsObj)

    const sql = require("mssql")

    async function getDevices() {
        try {
            let pool = await sql.connect(process.env.DB_CONNECTION_STRING)
            let devices = await pool.request().query("SELECT * FROM devices")
            return devices.recordset
        } catch (error) {
            console.log(error)
        }
    }

    let devices = await getDevices()
    // console.log("devices", devices)

    if (searchParams.has("did")) {
        const deviceID = searchParams.get("did")
        // console.log("true")
        // console.log("deviceID", deviceID)
        // console.log("devices", devices)

        return NextResponse.json(
            devices.filter((item) => item.DID == deviceID),
            {
                status: 200,
            }
        )
    } else {
        return NextResponse.json(devices, {
            status: 200,
        })
    }
}
