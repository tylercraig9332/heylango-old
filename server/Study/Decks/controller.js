const express = require('express')
const router = express.Router()

const Deck = require('./factory')
//const DeckExpression = require('./DeckExpressionRelation')

router.get('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    Deck.read({author: req.session.user.id}).then(docs => res.send(docs))
    .catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})


router.post('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user.id
    Deck.create(req.body).then(d => {
        res.send(true)
    }).catch(err => {
        console.error(err)
        res.status(400).send(false)
    })
})


module.exports = router