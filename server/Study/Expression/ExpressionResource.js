const mongoose = require("mongoose")

const ExpressionScheme = mongoose.Schema({
    value: {type: String, required: true},
    author: {type: mongoose.Types.ObjectId, required: true},
    language: {type: String, required: true},
    translation: {type: String, default: ''}
})

module.exports = mongoose.model('Expression', ExpressionScheme)