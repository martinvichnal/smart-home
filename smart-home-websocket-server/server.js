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

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id)

    // Handle incomming messages between devices and server
    socket.on("deviceMessage", (message) => {
        console.log(
            `Received data from device ${socket.id}. Sending message to webMessage: %s`,
            message
        )

        // Forward the message to all web clients except the sender
        socket.broadcast.emit("webMessage", message)
    })

    // Handle incomming messages from web clients and server
    socket.on("webMessage", (message) => {
        console.log(
            `Received data from web client ${socket.id}. Sending message to deviceMessage: %s`,
            message
        )

        // Forward the message to the device except the sender
        socket.broadcast.emit("deviceMessage", message)
    })

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id)
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
