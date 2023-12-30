const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
})

const connectedClients = new Map()

function sendConnectionStatusEvent(socket, userId) {
    const connectedDevices = Array.from(connectedClients.values())
        .filter((client) => client.userId === userId)
        .map(({ socket, ...clientData }) => clientData) // Exclude socket data

    socket.emit("connectionStatus", { connectedDevices })
}

io.on("connection", (socket) => {
    let currentClient = null

    socket.on("join", (userId, deviceId, clientType) => {
        const clientId =
            clientType === "webapp"
                ? `${userId}-${clientType}-${socket.id}` // webapp has no device ID so we dont need to include it in the clientId
                : `${userId}-${deviceId}-${clientType}-${socket.id}`
        currentClient = { userId, deviceId, clientType, socket } // Store client values
        connectedClients.set(clientId, currentClient) // Adding a new client to the connectedClients Map

        console.log(
            `JOIN - (userId: ${userId}) | (deviceId: ${deviceId}) | (clientType: ${clientType})`
        )
        // console.log(
        //     `INFO - connectedClients: ${Array.from(connectedClients.keys())}`
        // )

        sendConnectionStatusEvent(socket, userId)

        socket.on(`${clientType}Message`, (targetDeviceId, message) => {
            let targetClients
            if (clientType === "webapp") {
                // If the message is from a webapp, send it to the specific device
                targetClients = Array.from(connectedClients.values()).filter(
                    (client) =>
                        client.userId === userId &&
                        client.deviceId === targetDeviceId
                )
                if (targetClients.length === 0) {
                    console.log(
                        `WEBMESSAGE | ERROR- Target device not found for (targetDeviceId: ${targetDeviceId}) | (message: ${message}))`
                    )
                    return
                }
            } else {
                // If the message is from a device, send it to all associated webapps
                targetClients = Array.from(connectedClients.values()).filter(
                    (client) =>
                        client.userId === userId &&
                        client.clientType === "webapp"
                )
                if (targetClients.length === 0) {
                    console.log(
                        `WEBMESSAGE | ERROR - Target device not found for (targetDeviceId: ${targetDeviceId}) | (message: ${message}))`
                    )
                    return
                }
            }

            targetClients.forEach((client) => {
                client.socket.emit("message", message)
                console.log(
                    `MESSAGE - Sending to (${client.deviceId}): ${message}`
                )
            })
        })
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

// if (clientType === "webapp") {
//     socket.on("webMessage", (deviceId, message) => {
//         let targetClients = Array.from(connectedClients.values()).filter(
//             (client) =>
//                 client.userId === userId &&
//                 client.deviceId === deviceId &&
//                 client.clientType === "webapp"
//         )
//         if (targetClients) {
//             targetClients.socket.emit("message", message)
//             console.log(
//                 `WEBMESSAGE - Sending to (${targetClients}) (${deviceId}): ${message}`
//             )
//         } else {
//             console.log(
//                 `WEBMESSAGE | ERROR- Target device not found for (${deviceId})`
//             )
//         }
//     })
// } else if (clientType === "device") {
//     socket.on("deviceMessage", (message) => {
//         let targetClients = Array.from(connectedClients.values()).filter(
//             (client) =>
//                 client.userId === userId && client.clientType === "webapp"
//         )
//         targetClients.forEach((client) => {
//             client.socket.emit("message", message)
//             console.log(
//                 `DEVICEMESSAGE - Sending to (${client.deviceId}): ${message}`
//             )
//         })
//     })
// }
