// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DBconfig from "../../config/DBconfig"

const sql = require("mssql")
export default async function handler(req, res) {
    const { senderAccount, receiverAccount, amount } = req.body

    await sql.connect(DBconfig)

    const result = await sql.query`
  use elshubank;
  EXEC [dbo].[fundTransfer] @senderAccount= ${senderAccount}, @recieverAccount=${receiverAccount},@amount = ${amount}
  `

    res.status(200).json(result)
}
