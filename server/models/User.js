const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [User],
    favorites: [Lobby]
})

userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User