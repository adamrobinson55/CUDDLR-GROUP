const { Schema, model, Types } = require('mongoose')

const lobbySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    users: [{
        type: Types.ObjectId,
        ref: 'user'
    }],
    tags: [{
        type: Types.ObjectId,
        ref: 'tag'
    }]
})

const Lobby = model('lobby', lobbySchema)

module.exports = Lobby