const express = require('express')
const router = express.Router()

let model = require('./factory')

router.get('/id/:id', (req, res) => {
    // retrive post by id
    model.readById(req.params.id).then((post) => {
        res.send(post)
    })
    .catch(err => {
        res.status(400).send(err)
    })
}).get('/u/:user', (req, res) => {
    /* Gets posts made by a user */
    // todo
    model.read({author: req.params.user}).then(posts => {
        res.json(posts)
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})
.get('/all', (req, res) => {
    model.read({}).then((posts) => {
        res.json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})
.get('/belongs/:id', (req, res) => { // returns a json of {author : string, belongs : bool}
    model.readById(req.params.id).then((post) => {
        let b = false 
        // true if the author is the same and is not undefined
        b = (req.session.user !== undefined && req.session.user.id == post.author)
        const r = {
            author: post.author,
            belongs: b
        }
        res.send(r)
    })
})
.get('/:c', (req, res) => {
    model.read({community: req.params.c}).then(posts => {
        res.send(posts)
    })
    .catch((err) => {
        res.status(400).send(err)
    })
})

router.post('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('You need to be logged in to make a post.')
    }
    req.body.author = req.session.user.id
    model.create(req.body).then(r => {
        res.status(200).send(r)
    })
    .catch(err => {
        res.statusMessage = 'Something went wrong'
        res.status(400).send(err)
    })
})

router.put('/:id', (req, res) => {
    model.update({_id: req.params.id}, req.body).then((r) => res.status(200).send('Updated')).catch(err => res.status(400).send(err))
})

module.exports = router