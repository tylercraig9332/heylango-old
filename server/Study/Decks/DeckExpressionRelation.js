const mongoose = require('mongoose')

const DeckExpressionScheme = mongoose.Schema({
    deck: {type: mongoose.Types.ObjectId, required: true},
    expression: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = mongoose.model('DeckExpression', DeckExpressionScheme)