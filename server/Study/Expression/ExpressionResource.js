const mongoose = require("mongoose")

const ExpressionScheme = mongoose.Schema({
    value: {type: String, required: true},
    author: {type: mongoose.Types.ObjectId, required: true},
    language: {type: String, required: true},
    translation: {type: String, default: ''},
    strength: {type: Number, default: 50, min: 1}
})

ExpressionScheme.pre('remove', function(next) {
    this.model('DeckExpression').remove({expression: this._id}, next)
})

module.exports = mongoose.model('Expression', ExpressionScheme)