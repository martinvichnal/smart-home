import { NextResponse } from "next/server"
import DBconfig from "@/config/DBconfig"
const sql = require("mssql")

export async function GET(request) {
    const { searchParams } = new URL(request.url)

    async function getDevices(databaseQuery) {
        try {
            let pool = await sql.connect(DBconfig)
            let devices = await pool.request().query(databaseQuery)
            return devices.recordset
        } catch (error) {
            console.log("An error has occurred: ", error)
        }
    }

    let databaseQuery = `SELECT * FROM devices;`

    if (searchParams.has("did")) {
        databaseQuery = `SELECT * FROM devices WHERE DID = '${searchParams.get(
            "did"
        )}';`
    } else if (searchParams.has("uid")) {
        databaseQuery = `SELECT * FROM devices WHERE UID = '${searchParams.get(
            "uid"
        )}';`
    }
    console.log("databaseQuery", databaseQuery)

    let result = await getDevices(databaseQuery)

    return NextResponse.json(result, {
        status: 200,
    })
}
