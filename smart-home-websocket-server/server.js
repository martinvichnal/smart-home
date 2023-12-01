const WebSocket = require("ws")

const wss = new WebSocket.Server({ port: 5000 })

wss.on("connection", (ws) => {
    console.log("A new client connected!")

    // Send a welcome message to the newly connected client
    ws.send("Welcome! You are connected to the WebSocket server.")

    ws.on("message", (message) => {
        console.log("Received: %s", message)
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message)
            }
        })
    })
    // ws.on("message", (message) => {
    //     console.log(`Received message: ${message}`)
    //     ws.send(`Server received your message: ${message}`)
    // })

    ws.on("close", () => {
        console.log("A client disconnected")
        // Broadcast the disconnection event to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("A client disconnected")
            }
        })
    })
})
// var app = require("express")()
// var http = require("http").createServer(app)
// var io = require("socket.io")(http)
// const PORT = 3000

// // When the server receives a post request on /sendData
// app.post("/sendData", function (req, res) {
//     //send data to sockets.
//     io.sockets.emit("event", { message: "Hello from server!" })

//     res.send({})
// })

// // When a new connection is requested
// io.on("connection", function (socket) {
//     console.log("User Connected!")

//     // Send to the connected user
//     socket.emit("event", { message: "Connected !!!!" })

//     // On each "status", run this function
//     socket.on("status", function (data) {
//         console.log(data)
//     })
// })

// // Listen to port 3000
// http.listen(PORT, function () {
//     console.log("listening on port: ", PORT)
// })
