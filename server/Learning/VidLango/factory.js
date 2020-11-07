const Resource = require('./VidLango')

function create(body) {
    let v = new Resource(body)
    return v.save()
}

function read(body, callback) {
    Resource.find(body, (err, res) => {
        if (err) {
            console.error(err)
            callback(err)
            return
        }
        callback(res)
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