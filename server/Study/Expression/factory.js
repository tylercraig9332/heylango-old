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
            return Resource.findOne({_id: doc.expression}, (err, exp) => {
                if (exp == null) {
                    console.error('DeckExpression Corruption, see DeckExpression/factory.js, line 23')
                    console.log(doc)
                }
                if (err) throw new Error(err)
            }).exec()
        })
        Promise.all(expPromiseArray).then(expressions => {
            expressions = expressions.filter((expression) => {
                return expression !== null && expression !== undefined
            })
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

function _delete(_id, callback) {
    Resource.findByIdAndDelete(_id).then((err, doc) => {
        if (err) console.error(err)
        callback(true)
    })
}

function adjustStrength(body, callback) {
    console.log('adjusting strength', body)
    Resource.findById(body._id).exec((err, sex) => {
        if (err || sex === null) {
            console.error(err)
            callback(err, 'Failed to find expression')
        } else {
            let s = sex.strength // load the previous saved expression's strength
            if (s === undefined || s === null) s = 50 // This allows data before this update to be updated.
            switch (body.grade) { // Update based on grade
                case 'a':
                    s += 10
                    break;
                case 'b':
                    s += 5
                    break;
                case 'c':
                    s += 1
                    break;
                case 'd':
                    s -= 5
                    break;
                case 'f':
                    s -= 10
                    break;
                default: // don't change s
                    break; 
            }
            if (s < 1) s = 1 // Ensure that strength doesn't get below 1
            // TODO: multiply by some factor of last updated.. So if last updated was a year a go multiply this value by a big number so it comes up way later/sooner
            sex.strength = s
            sex.save(null, (err, newSex) => {
                console.log(newSex)
                callback(err, 'Strength Updated!')
            })
        }
    })
}


module.exports = {
    create,
    read,
    readDeck,
    update,
    delete: _delete,
    adjustStrength
}