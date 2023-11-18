// // make sure that any items are correctly URL encoded in the connection string
// const sql = require("mssql")

// const server = process.env.DB_SERVER || "localhost"
// const userName = process.env.DB_USERNAME || "your DB user name" //if you have a domain account "domainName//userName" use 2 backslashes or username@domain
// const password = process.env.DB_PASSWORD || "your DB password Here"
// const database = process.env.DB_NAME || "elshubank"

// const DBconfig = `Server=${server},1433;Database=${database};User Id=${userName};Password=${password};Encrypt=false`

// export default DBconfig

const sql = require("mssql")
const SERVER = process.env.DB_SERVER || "localhost"
const USERNAME = process.env.DB_USERNAME || ""
const PASSWORD = process.env.DB_PASSWORD || ""
const DATABASE_NAME = process.env.DB_NAME || ""
const HOST_NAME = process.env.DB_HOST_NAME || "localhost"

const config = {
    user: USERNAME,
    password: PASSWORD,
    server: HOST_NAME,
    database: DATABASE_NAME,
}

// const config = `Server=${SERVER},1433;Database=${DATABASE_NAME};User Id=${USERNAME};Password=${PASSWORD};Encrypt=false`

export default config
