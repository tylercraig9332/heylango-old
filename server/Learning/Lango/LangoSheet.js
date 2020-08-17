const mongoose = require("mongoose")

const LangoScheme = mongoose.Schema({
    content: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    alternateContent: {type: String},
    audio: {type: Buffer},
    videoId: {type: String},
    author: {type: mongoose.Types.ObjectId, required: true},  
}, { timestamp: true })

module.exports = mongoose.model('LangoSheet', LangoScheme)