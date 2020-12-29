const mongoose  = require('mongoose')
const Lango = require('../Learning/Lango/LangoResource')
const VidLango = require('../Learning/VidLango/VidLango')

const LikeScheme = mongoose.Schema({
    parent: {type: mongoose.Types.ObjectId, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
}, {timestamp: true})

LikeScheme.post('save', function() {
    Lango.exists({_id: this.parent}, (err, res) => {
        if (res) {
            Lango.updateOne({_id: this.parent}, {$inc: {'likes': 1}}).exec((err, doc) => {
                if (err) console.error(err)
            })
        }
    })
    VidLango.exists({_id: this.parent}, (err, res) => {
        if (res) {
            VidLango.updateOne({_id: this.parent}, {$inc: {'likes': 1}}).exec((err, doc) => {
                if (err) console.error(err)
            })
        }
    })
})

module.exports = mongoose.model('Like', LikeScheme)
