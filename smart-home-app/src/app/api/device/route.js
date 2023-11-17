// http://localhost:3000/api?name=asd&instrument=asdasd
// http://localhost:3000/api?id=a550b29757374abda73c15d29e2cd1e1
// http://localhost:3000/api?id=a550b29757374abda73c15d29e2cd1e1&asdasd=asdasdasdasd

import { data } from "../../../lib/placeholder-data"
import { NextResponse } from "next/server"

/**
 * @brief API route for fetching data.
 * @param http://localhost:3000/api?did={device ID}
 * @returns data JSON array || status: 200
 * @example http://localhost:3000/api?did=a550b29757374abda73c15d29e2cd1e1
 */
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    // const obj = Object.fromEntries(searchParams.entries())
    // console.log("request happened", obj) // request happened { id: 'a550b29757374abda73c15d29e2cd1e1', asdasd: 'asdasdasdasd' }

    if (searchParams.has("did")) {
        console.log("true")
        const dataId = searchParams.get("did")

        return NextResponse.json(
            data.filter((item) => item.did == dataId),
            {
                status: 200,
            }
        )
    } else {
        console.log("false")
        return Response("Hello, Next.js!", {
            status: 200,
        })
    }
}
