const mongoose = require('mongoose')

const User = mongoose.Schema({
    username: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true},
    email: {type: String},
    bio: {type: String},
    salt: String,
    meta: {
        ip: {type: Number},
        role: {type: String, default: 'logged'}, // String that defines permissons for the user
    }
}, {timestamp: true})

module.exports = mongoose.model('User', User) 