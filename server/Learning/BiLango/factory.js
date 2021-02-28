const BiSheet = require('./BiSheet')

function create(body) {
    let sheet = new BiSheet(body)
    return sheet.save()
}

async function read(body) {
    await checkConnection()
    let doc = await BiSheet.find(body, (err, docs) => {
        console.log(docs)
        if (err) throw new Error(err)
    })
    .catch(err => {throw new Error(err)})
    return doc
}

function update() {

}

function _delete() {

}

module.exports = {
    create,
    read,
    update,
    _delete
}