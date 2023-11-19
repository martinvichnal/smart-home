const sql = require("mssql")

const connectDB = async () => {
    try {
        await sql.connect(process.env.DB_CONNECTION_STRING)
        console.log("MSSQL Database is Connected...")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
