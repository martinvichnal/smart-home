// const http = require("http")
// const { Server } = require("socket.io")
// const cors = require("cors")
// const httpServer = http.createServer()
// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         allowedHeaders: ["my-custom-header"],
//         credentials: true,
//     },
// })

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

// websocket on events:
// connection - from client to server
// disconnect - from client to server
// deviceMessage - between devices and server
// webMessage - between web clients and server

// Room Implementation
// socket.on("join_room", (roomId) => {
//     socket.join(roomId)
//     console.log(`user with id-${socket.id} joined room - ${roomId}`)
// })

// socket.on("send_msg", (data) => {
//     console.log(data, "DATA")
//     //This will send a message to a specific room ID
//     socket.to(data.roomId).emit("receive_msg", data)
// })

// console.log("A user connected:", socket.id)
// // Handle device registration for message channelling
// socket.on("register", (data) => {
//     console.log(`Received registration from ${socket.id}:`, data)
//     const { deviceId, userId } = data
//     // Create a group for the user if it doesn't exist
//     const userGroup = `user:${userId}`
//     if (!deviceGroups.has(userGroup)) {
//         deviceGroups.set(userGroup, new Set())
//     }
//     // Add the device to the user's group
//     deviceGroups.get(userGroup).add(socket)
//     // Store device information in the database
//     // ...
//     console.log(`Device ${deviceId} registered for user ${userId}`)
// })
