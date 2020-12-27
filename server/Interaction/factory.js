const Like = require('./Like')
const Save = require('./Save')
const Score = require('./Score')
const Lango = require('../Learning/Lango/LangoResource')
const VidLango = require('../Learning/VidLango/VidLango')
const Post = require('../Post/Post')

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

/**
 * Takes in an array of SaveResources and collects all the resources and returns it as one big object
 * @deprecated
 * @param {Array<SaveResource>} saves
 * @returns {Object} formated as {vidlangos[], langos[], posts[]} 
 */
async function collect_saves(saves) {
    let r = {
        vidLangos: [],
        langos: [],
        posts: []
    }
    var proms = saves.map((save) => {
        switch (save.parentType) {
            case 'lango':
                return new Promise((resolve, reject) => {
                    Lango.findById(save.parent, (err, doc) => {
                        if (err) reject()
                        r.langos.push(doc)
                        //console.log(doc.title)
                        resolve(r.langos)
                    })
                })
            case 'VidLango':
                return new Promise((resolve, reject) => {
                    VidLango.findById(save.parent, (err, doc) => {
                        if (err) reject()
                        r.vidLangos.push(doc)
                        //console.log(doc.title)
                        resolve(r.vidLangos)
                    })
                })
            case 'post':
                return new Promise((resolve, reject) => {
                    Post.findById(save.parent, (err, doc) => {
                        if (err) reject()
                        r.posts.push(doc)
                        //console.log(doc)
                        resolve(r.posts)
                    })
                })
            default:
                break;
        }
    })
    let p = await Promise.all(proms)
    return r
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
    delete_save,
    collect_saves
}
