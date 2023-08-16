const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        email: String
        name: String
        username: String
        password: String
        friends: [User]
        favorites: [Lobby]
    }
    
    type Lobby {
        name: String
        id: String
        users: [User]
        tags: [Tag]
    }

    type Tag {
        _id: ID
        name: String
    }

    input TagInput {
        name: String
    }

    type Message {
        text: String
        username: String
        user_id: String
    }

    type Query {
        user: User
        lobby: Lobby
        allUsers: [User]
        allLobbies: [Lobby]
        allMessages: [Message]
    }

    type Mutation {
        createUser(email: String!, username: String!, password: String!): User
        createLobby(name: String, tags: [TagInput]): Lobby
        createTag(name: String!): Tag
        createMessage(text: String!, username: String!, user_id: String!): Message
    }
`

module.exports = typeDefs