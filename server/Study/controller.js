const express = require('express')
const router = express.Router()

const Expression = require('./Expression/factory')
const translateText = require('../Util/translate.js')
const Deck = require('./Decks/factory')
const DeckExpression = require('./Decks/DeckExpressionRelation')
const InteractionFactory = require('../Interaction/factory')

const sortFn = require('./Expression/expSortFn')

router.get('/ex/:sort?', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    Expression.read({author: req.session.user._id}).then(exps => {
        s = req.params.sort
        if (s === undefined) s = 'language'
        exps.sort(sortFn.sort(s))
        res.send(exps)
    })
})
.get('/ex/t/:text/to/:to', (req, res) => {
    // Instantiates a client
    //console.log(gcloud)
    //console.log('translating...')
    if (req.params.to === 'zh-c' || req.params.to === 'zh-m') req.params.to = 'zh'
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
    Deck.read({author: req.session.user._id}).then(docs => res.send(docs))
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
.get('/deck/ex/:deck_id/:sort?', (req, res) => {
    Expression.readDeck(req.params.deck_id, (docs) => {
        // Sorts the deck based on given sort function name, sorts weak by default
        docs.sort(sortFn.sort(req.params.sort))
        res.send(docs)
    })
})

router.post('/ex/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user._id
    InteractionFactory.increase_score(InteractionFactory.scores.EXPR, req.session.user._id, (err, doc) => {})
    Expression.create(req.body).then(r => res.send(r)).catch(err => res.status(400).send(err))
}).post('/deck/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user._id
    Deck.create(req.body).then(d => {
        InteractionFactory.increase_score(InteractionFactory.scores.DECK, req.session.user._id, (err, doc) => {})
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
    //req.body.author = req.session.user._id
    Deck.createDeckExp(req.body.decks, req.body.expressions, req.session.user._id).then(r => {
        res.send('Expression(s) Added to Deck(s)')
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
    //console.log(already)
    //res.send(already)
})

router.patch('/ex/strength', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    Expression.adjustStrength(req.body, (err, response) => {
        if (err) res.status(400)
        InteractionFactory.increase_score(InteractionFactory.scores.STREN, req.session.user._id, (err, doc) => {})
        res.send(response)
    })
})
.patch('/ex/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user._id
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
.patch('/deck/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user._id
    Deck.update(req.params.id, req.body).catch(err => {console.log(err); res.status(400).send(err)})
    res.send(true)
})

router.delete('/ex/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    Expression.delete(req.params.id, (r) => res.send(r))
})
.delete('/deck/ex/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.expressions.forEach(exp_id => {
        Deck.deleteDeckExp({expression: exp_id, deck: req.body.deck_id}).catch(err => res.status(400).send(err))
    })
    res.send(true)
    
})
.delete('/deck/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    Deck.delete({_id: req.params.id, author: req.session.user._id}).then(r => res.send(true)).catch(err =>{ console.error(err); res.status(400).send(err)})
})


module.exports = router