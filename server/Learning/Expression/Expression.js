const mongoose = require('mongoose')

const ExpressionScheme = mongoose.Schema({
    value: { type: String, required: true, unique: true},
    translation: {type: String},
    language: {type: String, required: true}
}, { timestamp: true })