const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
})

const connectedClients = new Map()

// function sendConnectionStatusEvent(socket, userId) {
//     const connectedDevices = Array.from(connectedClients.values()).filter(
//         (client) => client.userId === userId
//     )
//     socket.emit("connectionStatus", { connectedDevices })
// }

io.on("connection", (socket) => {
    socket.on("join", (userId, deviceId, clientType) => {
        const clientId = `${userId}-${deviceId}-${clientType}-${socket.id}`
        connectedClients.set(clientId, { userId, deviceId, clientType, socket })
        console.log(
            `JOIN - (userId: ${userId}) | (deviceId: ${deviceId}) | (clientType: ${clientType})`
        )
        // console.log(`INFO - connectedClients: ${Array.from(connectedClients)}`)

        if (clientType === "webapp") {
            socket.on("webMessage", (deviceId, message) => {
                const targetDevice = Array.from(connectedClients.values()).find(
                    (client) =>
                        client.deviceId === deviceId &&
                        client.clientType === "device"
                )
                if (targetDevice) {
                    targetDevice.socket.emit("message", message)
                    console.log(
                        `WEBMESSAGE - Sending to (${deviceId}): ${message}`
                    )
                } else {
                    console.log(
                        `WEBMESSAGE | ERROR- Target device not found for (${deviceId})`
                    )
                }
            })
        } else if (clientType === "device") {
            socket.on("deviceMessage", (message) => {
                const webappClients = Array.from(
                    connectedClients.values()
                ).filter(
                    (client) =>
                        client.userId === userId &&
                        client.clientType === "webapp"
                )
                webappClients.forEach((client) => {
                    client.socket.emit("message", message)
                    console.log(
                        `DEVICEMESSAGE - Sending to (${client.deviceId}): ${message}`
                    )
                })
            })
        }
        // sendConnectionStatusEvent(socket, userId)
    })

    socket.on("disconnect", () => {
        for (const [clientId, client] of connectedClients.entries()) {
            if (client.socket === socket) {
                connectedClients.delete(clientId)
                console.log(
                    `DISCONNECT - (userId: ${client.userId}) | (deviceId: ${client.deviceId}) | (clientType: ${client.clientType})`
                )
                // sendConnectionStatusEvent(socket, client.userId)
                break
            }
        }
    })
})

// const PORT = process.env.PORT || 3001
const PORT = 5000
server.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`)
})
