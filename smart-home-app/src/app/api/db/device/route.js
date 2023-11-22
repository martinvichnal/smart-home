import { NextResponse } from "next/server"
import { handleDatabase } from "@/components/DataBase"
/**
 * @description Get a device from the database by ID or by user ID
 * @method GET
 * @API /api/db/device
 * @API /api/db/device?did={did}
 * @API /api/db/device?uid={uid}
 * @body -
 * @returns {JSON} result
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url)

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

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}

/**
 * @description Update device data in the database by ID
 * @method PUT
 * @API /api/db/device
 * @body {JSON} {did, dd}
 * @returns {JSON} result
 */
export async function PUT(request) {
    const { did, dn, dd, uid } = await request.json()

    let databaseQuery = `UPDATE devices SET DD='${dd}' WHERE DID='${did}';`

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}

/**
 * @description Add (insert) a device to the database
 * @method POST
 * @API /api/db/device
 * @body {JSON} {did, dn, dd, uid}
 * @returns {JSON} result
 */
export async function POST(request) {
    const { did, dn, dd, uid } = await request.json()

    let databaseQuery = `INSERT INTO devices (DID, DN, DD, UID ) VALUES ('${did}', '${dn}', '${dd}', '${uid}');`

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}

/**
 * @description Delete a device from the database by ID
 * @method DELETE
 * @API /api/db/device
 * @body {JSON} {did}
 * @returns {JSON} result
 */
export async function DELETE(request) {
    const { did } = await request.json()

    let databaseQuery = `DELETE FROM devices WHERE DID = '${did}';`

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}
