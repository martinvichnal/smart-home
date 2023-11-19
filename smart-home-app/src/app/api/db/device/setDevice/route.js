import { NextResponse } from "next/server"
import DBconfig from "@/config/DBconfig"
const sql = require("mssql")

export async function POST(request) {
    const { did, dn, dd, uid } = await request.json()

    let databaseQuery = `UPDATE devices SET DD='${dd}' WHERE DID='${did}';`
    console.log(databaseQuery)

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
