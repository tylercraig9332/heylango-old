const Resource = require('./LangoResource')

function create(body) {
    let sheetObj = new Resource(body)
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
    console.log("delete id:", id)
    let res = Resource.deleteOne({"_id:": id})
    return await res
}

module.exports = {
    create,
    read,
    readOne,
    update,
    _delete
}
