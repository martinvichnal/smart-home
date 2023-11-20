import { NextResponse } from "next/server"
import DBconfig from "@/config/DBconfig"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const searchParamsObj = Object.fromEntries(searchParams.entries())
    const deviceID = searchParams.get("did")
    // console.log("deviceID: ", deviceID)
    // console.log(`SELECT * FROM devices WHERE DID = '${deviceID}';`)

    const sql = require("mssql")

    async function getUser(databaseQuery) {
        try {
            let pool = await sql.connect(DBconfig)
            let result = await pool.request().query(databaseQuery)
            return result.recordset
        } catch (error) {
            console.log("An error has occurred: ", error)
        }
    }

    let result = await getUser(`SELECT * FROM devices;`)
    return NextResponse.json(result, {
        status: 200,
    })
}
