import { NextResponse } from "next/server"
import DBconfig from "@/config/DBconfig"
const sql = require("mssql")

export async function POST(request) {
    const { did, dn, dd, uid } = await request.json()

    let databaseQuery = `DELETE FROM devices WHERE DID = '${did}';`

    async function insertDevice(databaseQuery) {
        try {
            await sql.connect(DBconfig)
            const result = await sql.query(databaseQuery)
            return result
        } catch (error) {
            console.log("An error has occurred: ", error)
        }
    }

    let result = await insertDevice(databaseQuery)

    return NextResponse.json(result, {
        status: 200,
    })
}
