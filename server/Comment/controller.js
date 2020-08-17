const express = require('express')
const router = express.Router()

let model = require('./factory')


router.get('/post/:id', (req, res) => {
    model.read({parent: req.params.id}).then(comments => {
        res.send(comments)
    })
})

router.post('/', (req, res) => {
    model.create(req.body).then(r => {
        res.status(200).send(true)
    })
})

router.patch('/:id', (req, res) => {
    model.update({_id: req.params.id}, req.body)
    res.status(200).send(true)
})


module.exports = router