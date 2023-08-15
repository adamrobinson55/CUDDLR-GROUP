const {User, Lobby, Tag} = require("../models")

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
            console.log('ARGS: ', args)
            const bulkTags = await Tag.insertMany(args.tags)
            console.log(bulkTags)
            const newLobby = await (await Lobby.create({
                name: args.name,
                tags: bulkTags.map(tag => tag._id)
            })).populate('tags')
            console.log('New Lobby!!!!!!')
            console.log(newLobby)
            
            return newLobby
        },
        createTag: async function (parent, args) {
            return await Tag.create(args)
        }
    }
}

module.exports = resolvers