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

function update(body) {

}

function _delete(_id) {

}


module.exports = {
    create,
    read,
    update,
    delete: _delete
}