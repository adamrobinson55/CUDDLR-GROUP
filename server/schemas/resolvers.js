const {User, Lobby} = require("../models")

const resolvers = {
    Query: {
        user: async function(parent, args) {
            return await User.findById(args.id)
        },
        lobby: async function(parent, args) {
            return await Lobby.findById(args.id)
        },
        allUsers: async function() {
            return await User.find()
        },
        allLobbies: async function() {
            return Lobby.find()
        }
    },
    Mutation: {
        createUser: async function (parent, args) {
            return await User.create(args)
        },
        createLobby: async function (parent, args) {
            return await Lobby.create(args)
        },
        createTag: async function (parent, args) {
            return await Tag.create(args)
        }
    }
}

module.exports = resolvers