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
});

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
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substring(0, 2)} said ${message}`);
    });
});


async function startServer() {
    await apolloServer.start();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/graphql', expressMiddleware(apolloServer, {
        context: authMiddleware,
    }));

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`);
        });
    });
}

startServer();
