const express = require('express')
const router = express.Router()
const factory = require('./factory')

router.get('/', (req, res) => {
    factory.read(req.params.body).then(sheet => {
        res.send(sheet)
    }).catch(err => {
        res.statusMessage = 'Error Occurred'
        res.status(400).send(err)
    })
})

router.post('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user.id
    factory.create(req.body).then((r) => {
        console.log(r)
        res.send(200)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})

router.put('/', (req, res) => {
    // todo: edit
})

router.delete('/', (req, res) => {
    // todo: delete
})

module.exports = router