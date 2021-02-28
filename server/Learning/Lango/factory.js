const Resource = require('./LangoResource')
const Like = require('../../Interaction/Like')
const { checkConnection } = require('../../mongoose')

function create(body) {
    let sheetObj = new Resource(body)
    if (sheetObj.video_id.length > 0) {
        sheetObj.imgSrc = `https://img.youtube.com/vi/${sheetObj.video_id}/sddefault.jpg`
    }
    return sheetObj.save()
}

async function read(body) {
    // Resource.count({_id: this})
    await checkConnection()
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
    await checkConnection()
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
    await checkConnection()
    let doc = await Resource.findOne(body, (err, doc) => {
        if (err) throw new Error(err)
    })
    return doc
}

function update(by, body, callback) {
    Resource.updateOne(by, body, (err, doc) => {
        if (err) throw new Error(err)
        callback(err, doc)
    })
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
