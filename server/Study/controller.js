const express = require('express')
const router = express.Router()

const Expression = require('./Expression/factory')
const translateText = require('../Util/translate.js')
const Deck = require('./Decks/factory')
const DeckExpression = require('./Decks/DeckExpressionRelation')

router.get('/ex/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    Expression.read({author: req.session.user.id}).then(exps => res.send(exps))
})
.get('/ex/t/:text/to/:to', (req, res) => {
    // Instantiates a client
    //console.log(gcloud)
    //console.log('translating...')
    const text = req.params.text
    const target = req.params.to
    
    translateText(text, target).then(result => {
        res.send(result)
    }).catch(err => {
        res.status(400).send(err)
    })
    
})
.get('/decks/', (req, res) => {
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
.get('/deck/:id', (req, res) => {
    Deck.read({_id: req.params.id}).then(decks => {
        if (decks.length === 0) res.status(400).send('Error')
        res.send(decks[0])
    })
    .catch(err => {
        console.error(err)
        res.status(400).send(err)
    })
})
.get('/deck/ex/:deck_id', (req, res) => {
    Expression.readDeck(req.params.deck_id, (docs) => {
        console.log(docs)
        res.send(docs)
    })
})

router.post('/ex/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user.id
    Expression.create(req.body).then(r => res.send(r)).catch(err => res.status(400).send(err))
}).post('/deck/', (req, res) => {
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
.post('/deck/ex/', (req, res) => {
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

router.patch('/ex/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user.id
    //console.log(req.body)
    Expression.update({_id: req.params.id}, req.body).then((d) => {
        res.status(200).send('Saved!')
    })
    .catch(err => {
        console.log(err)
        res.statusMessage = 'Something went wrong :('
        res.status(400).send(err.toString())
    })
})

router.delete('/ex/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    Expression.delete(req.params.id).then(r => res.send(r))
})


module.exports = router