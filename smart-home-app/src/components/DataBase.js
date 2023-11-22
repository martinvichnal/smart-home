import DBconfig from "@/config/DBconfig"
const sql = require("mssql")

/**
 * @description Handle database connection with custom query
 * @param {SQL query string} databaseQuery
 * @returns {JSON} result
 */
export async function handleDatabase(databaseQuery) {
    console.log("databaseQuery: ", databaseQuery)
    try {
        let pool = await sql.connect(DBconfig)
        let devices = await pool.request().query(databaseQuery)
        return devices.recordset
    } catch (error) {
        console.log("An error has occurred: ", error)
    }
}
