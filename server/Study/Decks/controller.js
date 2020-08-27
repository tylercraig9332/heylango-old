const express = require('express')
const router = express.Router()

const Deck = require('./factory')
const DeckExpression = require('./DeckExpressionRelation')

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
.get('/ex/:deck_id', (req, res) => {
    DeckExpression.find({deck: req.params.deck_id}).then((err, doc) => {
        if (err) res.status(400).send(err)
        res.send(doc)
    })
    .catch(err => {
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
.post('/ex/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    //req.body.author = req.session.user.id
    Deck.createDeckExp(req.body.decks, req.body.expressions, req.session.user.id).then(r => {
        res.send('Words Added to Deck')
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
    //console.log(already)
    //res.send(already)
})


module.exports = router