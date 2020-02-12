const mongoose  = require('mongoose')

const LikeScheme = mongoose.Schema({
    parent: {type: mongoose.Types.ObjectId, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
}, {timestamp: true})

module.exports = mongoose.model('Like', LikeScheme)
