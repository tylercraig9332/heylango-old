const express = require('express')
const router = express.Router()
const factory = require('./factory')
const InteractionFactory = require('../../Interaction/factory')

router.get('/', (req, res) => {
    factory.read(req.params.body).then(sheet => {
        res.send(sheet)
    }).catch(err => {
        res.statusMessage = 'Error Occurred'
        res.status(400).send(err)
    })
})
.get('/all', (req, res) => {
    factory.read({}).then(sheets => {
        res.send(sheets)
    }).catch(err => {
        res.statusMessage = 'Error Occured'
        res.status(400).send(err)
    })
})
.get('/:id', (req, res) => {
    if (req.params.id == 'undefined') {
        res.status(404).send('sheet not found')
        return
    }
    console.log(req.params)
    factory.read({_id: req.params.id}).then(sheet => {
        res.send(sheet[0])
    }).catch(err => {
        res.statusMessage = 'Error Occured'
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
        //console.log(r)
        BadgeFactory.create('contributor', req.session.user.id)
        InteractionFactory.increase_score(InteractionFactory.scores.LANGO, req.session.user.id, (err, doc) => {})
        res.send(200)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
}).post('/audio', (req, res) => {
    console.log(req)
    res.send('test passed!')
})

router.put('/', (req, res) => {
    // todo: edit
})

router.delete('/', (req, res) => {
    // todo: delete
})

module.exports = router