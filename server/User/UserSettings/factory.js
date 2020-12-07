const Setting = require('./UserSetting')

function create(author, body) {
    let s = new Setting({author: author, ...body})
    return s.save()
}

function update(author, body, callback) {
    Setting.findOneAndUpdate({author: author}, body, (err, doc) => {
        callback(err, doc)
    })
}

function read(author, callback) {
    Setting.findOne({author: author}, (err, res) => {
        callback(err, res)
    })
}

function _delete(author, callback) {
    Setting.deleteOne({author: author}, (err) => callback(err, null))
}

module.exports = {
    create,
    update,
    read,
    delete: _delete
}