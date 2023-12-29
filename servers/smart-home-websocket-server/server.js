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

    socket.on("join", (userId, deviceId, clientType) => {
        socket.userId = userId
        socket.deviceId = deviceId
        const clientId = `${userId}-${deviceId}-${clientType}-${socket.id}`
        connectedClients.set(clientId, socket)

        sendConnectionStatusEvent(socket, userId)

        console.log(
            `User "${userId}" joined as: "${clientType}" with ID:"${deviceId}" with socket ID:"${socket.id}"`
        )

        if (clientType === "webapp") {
            socket.on("webMessage", (targetDeviceId, message) => {
                // Find the device socket with the matching deviceId
                const deviceSocket = Array.from(
                    connectedClients.entries()
                ).find(([clientId, socket]) =>
                    clientId.endsWith(`-${targetDeviceId}`)
                )?.[1]

                if (deviceSocket) {
                    deviceSocket.emit("message", message)
                    console.log(
                        `Webapp sent message to Device ${targetDeviceId}: ${message}`
                    )
                } else {
                    console.log(
                        `Webapp message target not found for Device ${targetDeviceId}`
                    )
                }
            })
        } else if (clientType === "device") {
            socket.on("deviceMessage", (message) => {
                // Find all webapp sockets associated with the userId
                const webappSockets = Array.from(connectedClients.entries())
                    .filter(
                        ([clientId, socket]) =>
                            clientId.startsWith(`${userId}-`) &&
                            socket.id !== socket.id // Exclude the sender
                    )
                    .map(([clientId, socket]) => socket)

                webappSockets.forEach((webappSocket) => {
                    webappSocket.emit("message", message)
                })

                console.log(
                    `Device ${deviceId} sent a message to Webapp: ${message}`
                )
            })
        }
    })

    socket.on("disconnect", () => {
        console.log(`A client disconnected: ${socket.id}`)

        const clientId = `${socket.userId}-${socket.deviceId}-${socket.id}`
        connectedClients.delete(clientId)
        console.log(
            `User ${socket.userId} for Device ${socket.deviceId} disconnected`
        )
    })
})

// const PORT = process.env.PORT || 3001
const PORT = 5000
server.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`)
})
