const sql = require("mssql")

const server = process.env.DB_SERVER
const userName = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

const DBconfig = process.env.DB_CONNECTION_STRING

export default DBconfig
