const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
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

    type Auth {
        token: ID
        user: User
    }

    type Message {
        text: String
        username: String
        user_id: String
    }

    type Query {
        me(id: ID): User
        user(id: ID): User
        lobby: Lobby
        allUsers: [User]
        allLobbies: [Lobby]
        allMessages: [Message]
    }

    type Mutation {
        addFriend(id: ID): User
        createUser(email: String!, username: String!, password: String!): Auth
        createLobby(name: String, tags: [TagInput]): Lobby
        createTag(name: String!): Tag
        createMessage(text: String!, username: String!, user_id: String!): Message
        login(name: String!, password: String!): Auth
        userJoinLobby(name: String!): Lobby
        userDisconnectLobby(name: String!): Lobby
    }
`

module.exports = typeDefs