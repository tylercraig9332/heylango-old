const express = require('express')
const router = express.Router()
const factory = require('./factory')
const BadgeFactory = require('../../Badge/factory')

router.get('/', (req, res) => {
    // Reads data from the database depending on the body's request.
    factory.read(req.body)
    .then(langos => res.staus(200).send(langos))
    .catch( err => res.status(400).send(err))
})
.get('/list/:by', (req, res) => {
    let body = undefined
    switch (req.params.by) {
        case 'oldest':
            // TODO:
            break
        case 'all':
        default:
            body = {}
    }
    if (body === undefined) return
    factory.read(body).then((langos) => res.status(200).send(langos))
    .catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})
.get('/:id', (req, res) => {
    factory.readOne({_id: req.params.id})
    .then(lango => res.status(200).send(lango))
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
    factory.create(req.body).then(response => {
        BadgeFactory.create('contributor', req.session.user.id)
        res.status(200).send(response)
    })
    .catch(err => res.status(400).send(err))
})

router.delete('/:id', (req, res) => {
    // TODO: test
    factory._delete(req.params.id).then(response => {
        res.send(response)
    })
})

module.exports = router