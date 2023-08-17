const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        name: String
        username: String
        aboutme: String
        password: String
        friends: [User]
        favorites: [Lobby]
    }
    
    type Lobby {
        name: String
        _id: String
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

    type Query {
        me(id: ID): User
<<<<<<< HEAD
        user(id: String): User
        lobby: Lobby
=======
        user(id: ID): User
        lobby(id: ID): Lobby
>>>>>>> a049f548594ef3e4eebf811689145eee45f99f30
        allUsers: [User]
        allLobbies: [Lobby]
    }

    type Mutation {
        addFriend(id: ID): User
        addFavoriteLobby(id: ID): Lobby
        createUser(email: String!, username: String!, password: String!): Auth
        createLobby(name: String, tags: [TagInput]): Lobby
        createTag(name: String!): Tag
        login(email: String!, password: String!): Auth
        userJoinLobby(name: String!): Lobby
        userDisconnectLobby(name: String!): Lobby
    }
`

// save for later :)
// type Message {
//     text: String
//      username: String
//      user_id: String
//  }
// query
// allMessages: [Message]
// mutation
// createMessage(text: String!, username: String!, user_id: String!): Message
module.exports = typeDefs