const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
})

const connectedClients = new Map()

const sendConnectionStatusEvent = (socket, userId) => {
    const connectedDevices = Array.from(connectedClients.keys())
        .filter((clientId) => clientId.startsWith(userId))
        .map((clientId) => clientId.split("-")[1])

    socket.emit("connectionStatus", { connectedDevices })
}

io.on("connection", (socket) => {
    console.log(`A client connected: ${socket.id}`)

    socket.on("join", (userId, userType) => {
        socket.userId = userId
        const clientId = `${userId}-${socket.id}`
        connectedClients.set(clientId, socket)

        sendConnectionStatusEvent(socket, userId)

        console.log(
            `User ${userId} joined as ${userType} with socket ID ${socket.id}`
        )

        if (userType === "webapp") {
            socket.on("webMessage", (data) => {
                const { deviceId, message } = data
                console.log("data: " + data.deviceId + " " + data.message)
                const deviceClientId = `${userId}-${deviceId}`
                const deviceSocket = connectedClients.get(deviceClientId)
                if (deviceSocket) {
                    deviceSocket.emit("message", message)
                    console.log(
                        `Webapp sent message to Device ${deviceId}: ${message}`
                    )
                } else {
                    console.log(
                        `Webapp message target not found for Device ${deviceId}`
                    )
                }
            })
        } else if (userType === "device") {
            socket.on("deviceMessage", (message) => {
                const connectedWebappSockets = Array.from(
                    connectedClients.keys()
                )
                    .filter(
                        (clientId) =>
                            clientId.startsWith(userId) &&
                            clientId.includes("-webapp")
                    )
                    .map((clientId) => connectedClients.get(clientId))

                connectedWebappSockets.forEach((webappSocket) => {
                    webappSocket.emit("message", message)
                })

                console.log(`A device sent a message to Webapp: ${message}`)
            })
        }
    })

    socket.on("disconnect", () => {
        console.log(`A client disconnected: ${socket.id}`)

        const clientId = `${socket.userId}-${socket.id}`
        connectedClients.delete(clientId)
        console.log(`User ${socket.userId} disconnected`)
    })
})

// const PORT = process.env.PORT || 3001
const PORT = 5000
server.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`)
})
