import { NextResponse } from "next/server"
import { handleDatabase } from "@/components/DataBase"

/**
 * @description Get all user from the database or by ID
 * @method GET
 * @API /api/db/user
 * @API /api/db/user?uid={uid}
 * @body -
 * @returns {JSON} result
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url)

    let databaseQuery = `SELECT * FROM users;`
    if (searchParams.has("uid")) {
        databaseQuery = `SELECT * FROM users WHERE UID = '${searchParams.get(
            "uid"
        )}';`
    }

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}

/**
 * @description Update user data in the database by ID
 * @method PUT
 * @API /api/db/user
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function PUT(request) {
    const { uid } = await request.json()

    let databaseQuery = `UPDATE devices SET UID='${uid}' WHERE UID='${uid}';`
    console.log(databaseQuery)

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}

/**
 * @description Add (insert) a user to the database
 * @method POST
 * @API /api/db/user
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function POST(request) {
    const { uid } = await request.json()

    let databaseQuery = `INSERT INTO users (UID) VALUES ('${uid}');`

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}

/**
 * @description Delete a user from the database by ID
 * @method DELETE
 * @API /api/db/user
 * @body {JSON} {uid}
 * @returns {JSON} result
 */
export async function DELETE(request) {
    const { uid } = await request.json()

    let databaseQuery = `DELETE FROM users WHERE UID = '${uid}';`

    let result = await handleDatabase(databaseQuery)
    return NextResponse.json(result, {
        status: 200,
    })
}
