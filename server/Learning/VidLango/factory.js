const Resource = require('./VidLango')

function create(body) {
    let v = new Resource(body)
    return v.save()
}

function read(body, page, callback) {
    const options = {
        skip: (page - 1) * 8,
        limit: 8,
        sort: {_id: 'desc'}
    }
    Resource.find(body, null, options, (err, res) => {
        if (err) {
            console.error(err)
            callback(err, res)
            return
        }
        callback(null, res)
    })
}

function update(by, body, callback) {
    Resource.updateOne(by, body, (err, doc) => {
        if (err) throw new Error(err)
        callback(err, doc)
    })
}

function _delete() {

}

module.exports = {
    create,
    read,
    update,
    delete: _delete
}