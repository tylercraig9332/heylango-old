const Post = require('./Post')

async function create(post) {
    let p = new Post(post)
    await p.save()
    return read(p._id)
}

/**
 * Reads posts from the db dependent on the body object.
 * @param {Object} body mongodb specs to specify the data by.
 * @returns {Array.<Object>} formatted posts as an array of Objects
 */
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

    let docs = await Post.find(body, null, {sort: '-_id', limit: 25}, async (err, d) => {
        if (err) throw new Error(err)
        //console.log(d)
        return d
    })
    //console.log(docs)
    return await _formatPosts(docs)
}

async function readById(id) {
    let p = await Post.findById(id, (err, p) => {
        if (err) throw new Error(err)
        
    })
    return _formatPostObject(p)
}

async function update(from, body) {
    let d = Post.findOneAndUpdate(from, body, (err, doc) => {
        if (err) throw new Error(err)
        return doc
    })
    return await d
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
