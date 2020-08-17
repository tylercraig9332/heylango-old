const mongoose = require('mongoose')

const CommentScheme = mongoose.Schema({
    content: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, required: true},
    author: {type: mongoose.Types.ObjectId, required: true},
}, {timestamp: true})

module.exports = mongoose.model('Comment', CommentScheme)