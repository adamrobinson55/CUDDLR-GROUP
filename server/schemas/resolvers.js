const { AuthenticationError } = require("apollo-server-express")
const { User, Lobby, Tag } = require("../models")
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            return await User.findById(context._id)
        },
        user: async function (parent, args) {
            console.log(args, "ARGS")
            const userData = await User.findById(args.id)
            console.log(userData)
            return userData
        },
        lobby: async function (parent, args) {
            return await Lobby.findById(args.id)
        },
        allUsers: async function () {
            return await User.find()
        },
        allLobbies: async function () {
            return Lobby.find().populate('tags')
        }
    },
    Mutation: {
        addFavoriteLobby: async function(parent, args, context) {
            console.log('args data: ', args)
            //lobby frontend fave button should return the lobbies schema data?
            const newLobby = await Lobby.findById(args._id)
            if(!newLobby) {
                console.log('No Lobby Found with this ID :^(')
                return null
            }
            console.log('New Lobby Data: ', newLobby)
            const newLobbyId = newLobby._id

            return await User.findOneAndUpdate(
                {_id: context._id},
                {
                    $addToSet: { favorites: newLobbyId }
                },
                {
                    new: true
                }
            )
        },
        addFriend: async function (parent, args, context) {
            console.log('args data: ', args)
            const newFriend = await User.findById(args._id)
            if(!newFriend) {
                console.log('No Friend Found With This ID :^)')
                return null
            }
            const newFriendId = newFriend._id
            console.log('new friend data: ', newFriend)
            return await User.findOneAndUpdate(
                {_id: context._id},
                {
                    $addToSet: { friends: newFriendId}
                },
                {
                    new: true
                }
            )
        },
        userJoinLobby: async function (parent, args, context) {
            console.log('args data: ', args)
            const lobby = await Lobby.findOne(args.name)

            if(!lobby) {
                throw new AuthenticationError('No Lobby Found With This Name')
            }

            return await Lobby.findOneAndUpdate(
                {_id: lobby._id},
                {
                    $addToSet: { users: context._id}
                },
                {
                    new: true
                }
            )

        },
        userDisconnectLobby: async function (parent, args, context) {
            console.log('args data: ', args)
            return await Lobby.findOneAndUpdate(
                {name: args.name},
                {
                    $pull: {users: context._id}
                }
            )
        },
        //this works in theory
        login: async function (parent, {email, password}) {
            const user = await User.findOne({email})

            if(!user) {
                throw new AuthenticationError('No user found with this email')
            }

            const correctPw = await user.comparePassword(password)

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Credentials')
            }

            const token = signToken(user)

            return {token, user}
        },
        // createUser works
        createUser: async function (parent, args) {
            const user = await User.create(args)
            const token = signToken(user)

            return { token, user}
        },
        // createLobby works
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
        // createTag probably isn't needed
        createTag: async function (parent, args) {
            return await Tag.create(args)
        }
    }
}

module.exports = resolvers