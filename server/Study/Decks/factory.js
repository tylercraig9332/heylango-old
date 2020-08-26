const Deck = require('./DeckResource')

function create(body) {
    let d = Deck(body)
    return d.save()
}

async function read(body) {
    let d = await Deck.find(body, (err, docs) => {
        if (err) throw new Error(err)
    })
    return d
}

function update(_id, body) {

}

function _delete(_id) {

}

module.exports = {
    create,
    read,
    update,
    delete : _delete
}