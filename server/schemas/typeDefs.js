const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        email: string
        username: string
        password: string
        friends: [User]
        favorites: [Lobby]
    }
    
    type Lobby {
        name: string
    }

    type Tag {
        name: string
        tags: [Tag]
    }

    type Query {
        user: User
        lobby: Lobby
        allUsers: [User]
        allLobbies: [Lobby]

    }

    type Mutations {
        createUser(email: string!, username: string!, password: string!): User
        createLobby(name: string!, tags: [Tag]): Lobby
        createTag(name: string!): Tag
    }
`