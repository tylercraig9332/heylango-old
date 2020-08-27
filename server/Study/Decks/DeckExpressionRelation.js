const mongoose = require('mongoose')

const DeckExpressionScheme = mongoose.Schema({
    deck: {type: mongoose.Types.ObjectId, required: true},
    expression: {type: mongoose.Types.ObjectId, required: true},
    author: {type: mongoose.Types.ObjectId, required: true}
})

DeckExpressionScheme.index({ deck: 1, expression: 1 }, { unique: true })

module.exports = mongoose.model('DeckExpression', DeckExpressionScheme)