const mongoose = require('mongoose')

const UserSettingScheme = mongoose.Schema({
    author : {type: mongoose.Types.ObjectId, required: true, unique: true},
    primaryLanguage: {type : String, default: 'en', required: true}, // Primary language of user that they will be learning through
    targetLanguages: [String], // Array of languages that the user wants to learn
})

module.exports = mongoose.model('UserSetting', UserSettingScheme)