const mongoose = require('mongoose')

const BadgeScheme = mongoose.Schema({
    type : {type: String, required: true},
    author : {type: mongoose.Types.ObjectId, required: true},
    custom: {type: String, default: ''},
    enabled: {type: Boolean, default: true}
})

// Ensures that a badge can't be made more than once
BadgeScheme.index({type: 1, author: 1}, {unique: true})

module.exports = mongoose.model('Badge', BadgeScheme)