const express = require('express')
const router = express.Router()

let model = require('./factory')
const InteractionFactory = require('../Interaction/factory')


router.get('/post/:id', (req, res) => {
    model.read({parent: req.params.id}).then(comments => {
        res.send(comments)
    })
})

router.post('/', (req, res) => {
    if (req.session.user === undefined) {
        res.statusMessage = 'Must be logged in to preform this action'
        res.status(400).send('Must be logged in to preform this action')
        return
    }
    model.create(req.body).then(r => {
        InteractionFactory.increase_score(InteractionFactory.scores.COMMENT, req.session.user.id, (err, doc) => {})
        res.status(200).send(r)
    })
    .catch(err => {
        console.error(err)
        res.status(400).send(err)
    })
})

router.patch('/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.statusMessage = 'Must be logged in to preform this action'
        res.status(400).send(false)
        return
    }
    model.update({_id: req.params.id}, req.body)
    res.status(200).send(true)
})


module.exports = router