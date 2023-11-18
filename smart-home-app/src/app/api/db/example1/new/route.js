// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DBconfig from "../../config/DBconfig"

const sql = require("mssql")
export default async function handler(req, res) {
    const { firstName, lastName, balance } = req.body

    await sql.connect(DBconfig)

    const result = await sql.query`
  use elshubank;
  execute [dbo].[createNewClient] @firstName =${firstName}, @lastName = ${lastName}, @balance =  ${balance}
  `

    res.status(200).json(result)
}
