const express = require("express")
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConnection")
const cors = require("cors")

// Connecting to Microsoft SQL database
connectDb()

// Creating server
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use("/api/devices", require("./routes/deviceRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
