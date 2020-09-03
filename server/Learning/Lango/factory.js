const Resource = require('./LangoResource')
const Like = require('../../Interaction/Like')

function create(body) {
    let sheetObj = new Resource(body)
    if (sheetObj.video_id.length > 0) {
        sheetObj.imgSrc = `https://img.youtube.com/vi/${sheetObj.video_id}/sddefault.jpg`
    }
    return sheetObj.save()
}

async function read(body) {
    // Resource.count({_id: this})
    let docs = await Resource.find(body, (err, docs) => {
        if (err) throw new Error(err)
        return docs
    })
    .catch(err => {throw new Error(err)})
    return docs
}

async function readMany(body, page, callback) {
    const options = {
        skip: (page - 1) * 7,
        limit: 7, 
        sort: {likes: 'desc'}
    }
    let d = await Resource.find(body, null, options, async (err, langos) => {
        /*let proms = langos.map(async (doc) => {
            let counts = await Like.countDocuments({parent: doc._id}, (err, doc) => {
                if (err) console.error(err)
            })
            return {...doc.toObject(), likes: counts}
        })
        let newDocs = await Promise.all(proms)*/
        callback(langos, err)
    })
}

async function readOne(body) {
    let doc = await Resource.findOne(body, (err, doc) => {
        if (err) throw new Error(err)
    })
    return doc
}

async function update(id, body) {
    // We may want to pull the id out and append it to the body
    let d = Resource.findOneAndUpdate(id, body, (err, doc) => {
        if (err) throw new Error(err)
        return doc
    })
    return await d
}

async function _delete(id) {
    //console.log("delete id:", id)
    let res = Resource.deleteOne({"_id:": id})
    return await res
}

module.exports = {
    create,
    read,
    readMany,
    readOne,
    update,
    _delete
}
