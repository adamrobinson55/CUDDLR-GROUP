const { Schema, model, Types} = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./User')
const Tag = require('./Tag')

const lobbySchema = new Schema({
    name: {
        type: String, 
        unique: true,
        required: true
    },
    users: [{
        type: Types.ObjectId,
        ref: User
    }],
    tags: [{
        type: Types.ObjectId, 
        ref: Tag
    }]
})

const Lobby = model('lobby', lobbySchema)

module.exports = Lobby