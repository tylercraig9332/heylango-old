const Like = require('./Like')
const Save = require('./Save')

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

async function readOne(body) {
    let doc = await Like.findOne(body, (err, doc) => {
        if (err) console.log(err)
    })
    return (doc !== null) 
}

function _delete(body) {
    Like.deleteMany(body, (err) => {
        if (err) throw new Error(err)
    })
}

module.exports = {
    create_save,
    create_like,
    read_like,
    read_save,
    readOne,
    delete: _delete
}
