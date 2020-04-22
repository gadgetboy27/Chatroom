const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', socket => {
    // Wecome current user
    // socket.emit sends message to single user thats connecting
    socket.emit('message', 'Welcome to our chatroom')

    // Broadcast when a user connects 
    // Broadcast.emit messages to all except user thats connecting
    socket.broadcast.emit('message', 'A user has joined the chatroom')

    // Runs when client disconnects
    socket.on("disconnect", () => {
        io.emit('message', 'A user has left chatroom')
    // io.emit messages to all in the chat
    })

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on ${PORT}`))