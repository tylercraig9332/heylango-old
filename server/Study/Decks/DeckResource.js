const mongoose = require('mongoose')

const DeckScheme = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    author: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = mongoose.model('Deck', DeckScheme)