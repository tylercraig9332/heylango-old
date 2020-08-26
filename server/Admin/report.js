const mongoose = require('mongoose')

const ReportScheme = mongoose.Schema({
    type: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, required: true},
    parentType: {type: String},
    details: {type: String, default: ''},
    madeBy: {type: mongoose.Types.ObjectId, null: true}
}, { timestamp: true })

module.exports = mongoose.model('Report', ReportScheme)