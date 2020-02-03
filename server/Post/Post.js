const mongoose = require('mongoose')

const PostScheme = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    community: { type: mongoose.Types.ObjectId },
    image: { type: String, default: '/static/post' },
    author: { type: mongoose.Types.ObjectId, required: true }
}, { timestamp: true })

module.exports = mongoose.model('Post', PostScheme)