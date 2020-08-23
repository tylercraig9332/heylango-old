const Resource = require('./ExpressionResource')

function create(body) {
    let expressionObject = new Resource(body)
    return expressionObject.save()
}

async function read(body) {
    let docs = await Resource.find(body, (err, docs) => {
        if (err) throw new Error(err)
        return docs
    })
    .catch(err => {throw new Error(err)})
    return docs
}

async function update(from, body) {
    let d = Resource.findOneAndUpdate(from, body, (err, doc) => {
        if (err) throw new Error(err)
        return doc
    })
    return await d
}

async function _delete(_id) {
    let r = Resource.findByIdAndDelete(_id).then((err, doc) => {
        if (err) return false
        return true
    })
    return await d
}


module.exports = {
    create,
    read,
    update,
    delete: _delete
}