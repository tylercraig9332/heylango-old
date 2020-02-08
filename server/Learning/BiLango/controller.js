const express = require('express')
const router = express.Router()
const factory = require(factory)

router.get('/', (req, res) => {

})

router.post('/', (req, res) => {
    factory.create(req.body).then((r) => {
        res.send(r)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})