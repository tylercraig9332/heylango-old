const express = require('express')
const router = express.Router()
const factory = require('./factory')
const BadgeFactory = require('../../User/Badge/factory')

router.get('/', (req, res) => {
    // Reads data from the database depending on the body's request.
    factory.read(req.body)
    .then(langos => res.staus(200).send(langos))
    .catch( err => res.status(400).send(err))
})
.get('/list/:by/:lang/:diff/:page', (req, res) => {
    let body = undefined
    let diff = (req.params.diff !== 'NA') ? {difficulty: req.params.diff} : {}
    let lang = (req.params.lang !== 'all') ? {language: req.params.lang} : {}
    switch (req.params.by) {
        case 'popular':
            // TODO: allow for most liked posts to be presented first.
            //console.log('popular', lang, diff)
            body = {
                ...diff,
                ...lang
            }
            break
        case 'oldest':
            // TODO:
            break
        case 'u':
            body = {author: req.session.user.id}
            break
        case 'all':
        default:
            body = {}
    }
    if (body === undefined) return
    factory.readMany(body, req.params.page, (langos, err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
        else {
            let a = langos.sort((a,b) => {
                return b.likes - a.likes
            })
            //console.log(a)
            res.status(200).send(a)
        }
    })
})
.get('/list/u/:user_id', (req, res) => {
    factory.read({author: req.params.user_id}).then((langos, err) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
        else {
            let a = langos.sort((a,b) => {
                return b.likes - a.likes
            })
            //console.log(a)
            res.status(200).send(a)
        }
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

router.put('/:id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('User need to be logged in to perform this action')
        return
    }
    factory.update({_id: req.params.id, author: req.session.user.id}, req.body, (err, r) => {
        if (err) res.status(400).send(err)
        else {
            res.send(req.params.id)
        }
    })
})

router.delete('/:id', (req, res) => {
    // TODO: test
    factory._delete(req.params.id).then(response => {
        res.send(response)
    })
})

module.exports = router