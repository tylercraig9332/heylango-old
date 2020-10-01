const mongoose = require('mongoose')

const DeckScheme = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    author: {type: mongoose.Types.ObjectId, required: true}
})

DeckScheme.pre('remove', function(next) {
    this.model('DeckExpression').remove({expression: this._id}, next)
})

module.exports = mongoose.model('Deck', DeckScheme)