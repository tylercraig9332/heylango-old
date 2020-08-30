const Deck = require('./DeckResource')
const DeckExpression = require('./DeckExpressionRelation')
const Expression = require('../Expression/ExpressionResource')

function create(body) {
    let d = Deck(body)
    return d.save()
}

async function createDeckExp(decks, expressions, author) {
    return await expressions.map(async (expression) => {
        return await decks.map(async (deck) => {
            const body = {
                deck: deck,
                expression: expression,
                author: author
            }
            const DeckExpObj = new DeckExpression(body)
            return DeckExpObj.save()
                .catch(async err => {
                    if (err.code === 11000) {
                        console.log('user attempting to add duplicate')
                        throw new Error(expression  + ' has already been added to deck ' + deck)
                    }
                })
        })
    })
}

async function read(body) {
    let d = await Deck.find(body, (err, docs) => {
        if (err) throw new Error(err)
    })
    return d
}

function update(_id, body) {
    return Deck.findByIdAndUpdate(_id, body, (err, docs) => {
        if (err) throw new Error(err)
    })
}

function _delete(body) {
    console.log(body)
    return Deck.deleteOne(body, (err) => {
        if (err) throw new Error(err)
    })
}

function _deleteDeckExp(body) {
    return DeckExpression.findOneAndDelete(body, (err, doc) => {
        if (err) throw new Error(err)
    })
}

module.exports = {
    create,
    createDeckExp,
    read,
    update,
    delete : _delete,
    deleteDeckExp: _deleteDeckExp
}