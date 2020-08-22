const express = require('express')
const router = express.Router()

const factory = require('./factory')

router.get('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    factory.read({author: req.session.user.id}).then(exps => res.send(exps))
})

router.post('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user.id
    factory.create(req.body).then(r => res.send(r)).catch(err => res.status(400).send(err))
})


module.exports = router