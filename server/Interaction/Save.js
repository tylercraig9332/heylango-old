const mongoose = require('mongoose')

const SaveScheme = mongoose.Schema({
    parent: {type: mongoose.Types.ObjectId, required: true},
    parentType: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
}, {timestamp: true})

module.exports = mongoose.model('Save', SaveScheme)