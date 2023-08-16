//Setting up Express
const express = require('express')
const app = express()
const { expressMiddleware } = require('@apollo/server/express4')

// Setting up Apollo Server
const { ApolloServer } = require('apollo-server-express')

const http = require("http");
const cors = require("cors");
const { Server } = require('socket.io') // Import Server class

const path = require('path');

// Setting up our custom middleware, schemas, and database
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection')

const PORT = process.env.PORT || 3001

// Set up Apollo Server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send('hello from the backend!')
})

// Create HTTP server instance
const serverHttp = http.createServer(app);

// Setting up Socket.io
const io = new Server(serverHttp, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Send message to room specifically
    socket.on('message', (message) => {
        console.log(message)
        socket.to(message.room).emit("recieve_message", message)
    })

    // Join a room
    socket.on('joinRoom', room => {
        socket.join(room)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} was Disconnected`)
    })
    
});

async function startServer(typeDefs, resolvers) {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app })

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
        });
    });
}

startServer(typeDefs, resolvers);