const BiSheet = require('./BiSheet')

async function create(body) {
    let sheet = new BiSheet(body)
    sheet.save()
}

function read(body) {
    BiSheet.find(body, (err, docs) => {
        console.log(docs)
        // TODO: handle the response here...
    })
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