const Post = require('./Post')

async function create(post) {
    let p = new Post(post)
    await p.save()
    return read(p._id)
}

async function read(body) {
    let p = []

    async function _formatPosts(docs) {
        let posts = []
        await docs.map(async (post) => {
            _formatPostObject(post).then(fp => {
                posts.push(fp)
            })
        })
        return posts
    }

    await Post.find(body, async (err, docs) => {
        if (err) throw new Error(err)
        return await _formatPosts(docs).then((fp) => {
            p = fp
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

async function _formatPostObject(p) {
    return {
        id: p._id,
        title: p.title,
        content: p.content,
        community: p.community,
        image: p.image,
        createdAt: await p._id.getTimestamp(),
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
