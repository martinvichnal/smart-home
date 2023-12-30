// Registered groups
const deviceGroups = new Map()

io.on("connection", (socket) => {
    const { deviceId, userId } = socket.handshake.query
    const userGroup = `user:${userId}`

    if (!deviceGroups.has(userGroup)) {
        deviceGroups.set(userGroup, new Map())
    }

    const group = deviceGroups.get(userGroup)
    group.set(deviceId || "web", socket)

    socket.on("message", (data) => {
        const targetDeviceId = data.targetDeviceId
        const message = data.message

        if (group.has(targetDeviceId)) {
            group.get(targetDeviceId).emit("message", message)
        }

        // If the message is from a device, also send it to the web client
        if (deviceId && group.has("web")) {
            group.get("web").emit("message", message)
        }
    })

    socket.on("ack", (data) => {
        const targetDeviceId = data.targetDeviceId
        const ackMessage = data.ackMessage

        if (group.has(targetDeviceId)) {
            group.get(targetDeviceId).emit("ack", ackMessage)
        }

        // If the ack is from a device, also send it to the web client
        if (deviceId && group.has("web")) {
            group.get("web").emit("ack", ackMessage)
        }
    })

    socket.on("disconnect", () => {
        group.delete(deviceId || "web")
        if (group.size === 0) {
            deviceGroups.delete(userGroup)
        }
    })
})
