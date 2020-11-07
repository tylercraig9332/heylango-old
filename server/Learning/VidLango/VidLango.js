const mongoose = require('mongoose')

const VidLangoScheme = mongoose.Schema({
    video_id: String,
    snippet: {type: String, required: true},
    captions: [],
    kind: String
})

module.exports = mongoose.model('VidLango', VidLangoScheme)