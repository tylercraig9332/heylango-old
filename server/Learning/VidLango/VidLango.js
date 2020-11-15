const mongoose = require('mongoose')

const VidLangoScheme = mongoose.Schema({
    video_id: String,
    //snippet: {type: String, required: true},
    title: String,
    meta: {
        title: String,
        description: String,
        categoryId: String,
        thumbnails: String
    },
    language: String,
    tags: [],
    captions: [],
    kind: String,
    author: {type: mongoose.Types.ObjectId, required: true},
})

VidLangoScheme.index({'$**': 'text'});

module.exports = mongoose.model('VidLango', VidLangoScheme)