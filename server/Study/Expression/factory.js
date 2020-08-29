const Resource = require('./ExpressionResource')
const DeckExpression = require('../Decks/DeckExpressionRelation')

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

async function readDeck(deck_id, callback) {
    await DeckExpression.find({deck: deck_id}, async (err, docs) => {
        const expPromiseArray = docs.map((doc) => {
            return Resource.findOne({_id: doc.expression}, (err, doc) => {
                if (err) throw new Error(err)
            }).exec()
        })
        Promise.all(expPromiseArray).then(expressions => {
            callback(expressions)
        })
        if (err) throw new Error(err)
    })
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
    readDeck,
    update,
    delete: _delete
}