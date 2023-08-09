const express = require('express')
const path = require('path');
const { ApolloServer } = require('apollo-server-express')
const { authMiddleware } = require('./utils/auth');


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection')


const PORT = process.env.PORT || 3001
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const app = express()

async function startServer() {
    await server.start()

    app.use(express.json())
    app.use(express.urlencoded({ extended: false}))

    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
      }));

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`)
        })
    })
}

startServer()