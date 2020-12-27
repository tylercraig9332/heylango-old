const Like = require('./Like')
const Save = require('./Save')
const Score = require('./Score')
const Lango = require('../Learning/Lango/LangoResource')
const Scores = require('./Scores.json')

function create_like(body) {
    // New Like
    let l = new Like(body)
    l.save()
}

function create_save(body) {
    // new Save
    let s = new Save(body)
    s.save()
}

function create_score(body) {
    let ip = new Score(body)
    ip.save()
}

async function read_like(body) {
    let l = []
    l = await Like.find(body, (err, likes) => {
        if (err) throw new Error(err)
        Like.count({_id: likes._id}).then(c => {
        })
    })
    return l
}

async function read_save(body) {
    let s = []
    s = await Save.find(body, (err, docs) => {
        if (err) throw new Error(err)
    })
    return s
}

function read_score(body, callback) {
    Score.find(body, callback)
}

async function readOne(body) {
    let doc = await Like.findOne(body, (err, doc) => {
        if (err) console.log(err)
    })
    return (doc !== null) 
}

function update_score(body, by, callback) {
    Score.updateOne(body, by, callback)
}

function increase_score(amount, user, callback) {
    Score.findOneAndUpdate({user: user}, {$inc: {'points': amount}}, callback)
}

function delete_like(body) {
    Like.findOneAndRemove(body, (err, doc) => {
        if (err) throw new Error(err)
        Lango.exists({_id: doc.parent}, (err, res) => {
            if (res) {
                Lango.updateOne({_id: doc.parent}, {$inc: {'likes': -1}}).exec((err, doc) => {
                    if (err) console.error(err)
                })
            }
        })
        // TODO: Add VidLango Support 
    })
}

function delete_save(body) {
    Save.findOneAndRemove(body, (err, doc) => {
        if (err) throw new Error(err)
    })
}

module.exports = {
    create_save,
    create_like,
    create_score,
    read_like,
    read_save,
    read_score,
    readOne,
    update_score,
    increase_score,
    scores: Scores,
    delete_like,
    delete_save
}
