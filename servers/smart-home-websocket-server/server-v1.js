const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
})

// Registered groups
const deviceGroups = new Map()

io.on("connection", (socket) => {
    console.log(`Received connection from ${socket.id}:`, req)
    const { deviceId, userId } = req.query // assuming deviceId and userId are passed as query parameters
    const userGroup = `user:${userId}`
    if (!deviceGroups.has(userGroup)) {
        deviceGroups.set(userGroup, new Set())
    }
    deviceGroups.get(userGroup).add(socket)
    // Store device information in the database
    console.log(`Device ${deviceId} registered for user ${userId}`)

    // Handle incomming messages between devices and server
    socket.on("deviceMessage", (data) => {
        console.log(
            `Received data from device ${socket.id}. Sending message to webMessage: %s`,
            data
        )

        // Consider this as an acknowledge message
        // Broadcast the message to all web clients in the user's group
        const userGroup = `user:${data.userId}`
        if (deviceGroups.has(userGroup)) {
            deviceGroups.get(userGroup).forEach((webSocket) => {
                if (webSocket !== socket) {
                    webSocket.emit("webMessage", data)
                }
            })
        }
    })

    // Handle incoming messages from web clients
    socket.on("webMessage", (data) => {
        console.log(
            `Received data from web client ${socket.id}. Sending message to deviceMessage: %s`,
            data
        )

        // Send the message only to the specific device
        const userGroup = `user:${data.userId}`
        if (deviceGroups.has(userGroup)) {
            const deviceSocket = deviceGroups
                .get(userGroup)
                .find((deviceSocket) => deviceSocket.id === data.deviceId)
            if (deviceSocket) {
                deviceSocket.emit("deviceMessage", data)
            }
        }
    })

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id)
        // Remove the socket from the user's group
        if (deviceGroups.has(userGroup)) {
            deviceGroups.get(userGroup).delete(socket)
        }
    })
})

// const PORT = process.env.PORT || 3001
const PORT = 5000
server.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`)
})
