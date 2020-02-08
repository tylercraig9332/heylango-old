import mongoose from 'mongoose'

const BiSheetScheme = mongoose.Schema({
    primary: {type: String, required: true},
    secondary: {type: String, required: true}, 
    audio: {type: Buffer},
    author: {type: mongoose.Types.ObjectId, required: true},
    notes: {type: String},
    title: {type: String, default: "BiLango Translation"}
}, { timestamp: true })

module.exports = mongoose.model('BiSheet', BiSheetScheme)