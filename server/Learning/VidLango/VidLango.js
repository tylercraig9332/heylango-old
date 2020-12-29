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
    tags: [String],
    captions: [],
    kind: String,
    author: {type: mongoose.Types.ObjectId, required: true},
    likes: {type: Number, default: 0},
    captionsAvaliable: [String]
})

VidLangoScheme.index({'$**': 'text'});

module.exports = mongoose.model('VidLango', VidLangoScheme)