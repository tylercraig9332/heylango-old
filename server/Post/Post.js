const mongoose = require('mongoose')

const PostScheme = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    community: { type: String, default: 'all'},
    image: { type: String, default: '/api/static/post' },
    author: { type: mongoose.Types.ObjectId, required: true }
}, { timestamp: true })

module.exports = mongoose.model('Post', PostScheme)