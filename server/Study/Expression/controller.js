const express = require('express')
const router = express.Router()

const factory = require('./factory')
const translateText = require('../../Util/translate.js')

router.get('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    factory.read({author: req.session.user.id}).then(exps => res.send(exps))
})
.get('/t/:text/to/:to', (req, res) => {
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

router.post('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user.id
    factory.create(req.body).then(r => res.send(r)).catch(err => res.status(400).send(err))
})

router.patch('/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    req.body.author = req.session.user.id
    console.log(req.body)
    factory.update({_id: req.params.id}, req.body).then((d) => {
        res.status(200).send('Saved!')
    })
    .catch(err => {
        console.log(err)
        res.statusMessage = 'Something went wrong :('
        res.status(400).send(err.toString())
    })
})

router.delete('/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    factory.delete(req.params.id).then(r => res.send(r))
})


module.exports = router