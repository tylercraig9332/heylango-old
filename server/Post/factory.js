const Post = require('./Post')

async function create(post) {
    let p = new Post(post)
    await p.save()
    return read(p._id)
}

async function read(body) {
    let p = []
    await Post.find(body, (err, docs) => {
        if (err) throw new Error(err)
        docs.map(post => {
            p.push(_formatPostObject(post))
        })
    })
    return p
}

async function readById(id) {
    return await Post.findById(id, (err, p) => {
        if (err) throw new Error(err)
        return _formatPostObject(p)
    })
}

function update(from, body) {
    Post.findOneAndUpdate(from, body, (err, doc) => {
        if (err) throw new Error(err)
        return doc
    })
}

function _delete() {

}

function _formatPostObject(p) {
    return {
        id: p._id,
        title: p.title,
        content: p.content,
        community: p.community,
        image: p.image,
        createdAt: p._id.getTimestamp(),
        author: p.author
    }
}

module.exports = {
    create,
    read,
    readById,
    update,
    _delete
}
