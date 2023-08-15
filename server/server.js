const express = require('express')
const path = require('path');
const { ApolloServer } = require('apollo-server-express')
const { expressMiddleware } = require('@apollo/server/express4')
const { authMiddleware } = require('./utils/auth');

// Socket.io import
const http = require('http').createServer()

const io = require('socket.io')(http, {
    cors: { origin: '*'}
})

io.on('connection', socket => {
    socket.broadcast.emit(`New user ${User.name} has enterd the chat`, {
        userId: socket.id,
        username: socket.username,
    })

    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', `${socket.id.subst(0,2)} said ${message}`)
    })
    socket.on('joinRoom', room => {
        socket.join(room)
    })
})

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection')


const PORT = process.env.PORT || 3001
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const app = express()

async function startServer() {
    await server.start()
    server.applyMiddleware({ app })

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`)
        })
    })
}

startServer()