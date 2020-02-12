const Like = require('./Like')

function create(body) {
    // New Like
    let l = new Like(body)
    l.save()
}

async function read(body) {
    let l = []
    l = await Like.find(body, (err, likes) => {
        if (err) throw new Error(err)
    })
    return l
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
    create,
    read,
    readOne,
    delete: _delete
}
