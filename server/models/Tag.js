const { Schema, model, types} = require('mongoose')
const bcrypt = require('bcrypt')

const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

const Tag = model('tag', tagSchema)

module.exports = Tag