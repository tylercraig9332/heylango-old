// Interaction Points -> Score
const mongoose = require('mongoose')

const ScoreSchema = mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, required: true},
    points: {type: Number, required: true},
    lastUpdated: {type: Date}
})

ScoreSchema.pre('findOneAndUpdate', function() {
    this.set({ lastUpdated: new Date() });
});

module.exports = mongoose.model('Score', ScoreSchema)