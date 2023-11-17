const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
    },
})

io.on("connection", async (socket) => {
    console.log("Connected :", socket.id)
})

httpServer.listen(3001, () => {
    console.log("WebSocket server listening on port 3001")
})

// const { Server } = require("socket.io")

// io.on("connection", (socket) => {
//     console.log("A user connected")

//     // Handle chat messages
//     socket.on("chat message", (message) => {
//         io.emit("chat message", message) // Broadcast the message to all connected clients
//     })

//     socket.on("disconnect", () => {
//         console.log("A user disconnected")
//     })
// })
