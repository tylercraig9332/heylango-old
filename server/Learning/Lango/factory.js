const Sheet = require('./LangoSheet')

function create(body) {
    let sheetObj = new Sheet(body)
    return sheetObj.save()
}

async function read(body) {
    let doc = await Sheet.find(body, (err, docs) => {
        console.log(docs)
        if (err) throw new Error(err)
    })
    .catch(err => {throw new Error(err)})
    return doc
}

async function update(id, body) {
    // We may want to pull the id out and append it to the body
    let d = Sheet.findOneAndUpdate(id, body, (err, doc) => {
        if (err) throw new Error(err)
        return doc
    })
    return await d
}

async function _delete(id) {
    console.log("delete id:", id)
    let res = Sheet.deleteOne({"_id:": id})
    return await res
}

module.exports = {
    create,
    read,
    update,
    _delete
}
