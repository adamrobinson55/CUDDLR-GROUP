const { Schema, model, types} = require('mongoose')
const bcrypt = require('bcrypt')

const tagSchema = new Schema({
    id: {
        type: String,
        
    },
    name: {
        type: String, 
        unique: true,
        required: true
    },
})

const Tag = model('tag', tagSchema)

module.exports = Tag