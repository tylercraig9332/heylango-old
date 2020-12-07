const express = require('express')
const router = express.Router()

const BadgeFactory = require('./factory')

router.get('/:user_id',(req, res) => {
    let author_id = req.params.user_id
    if (author_id === 'me') {
        author_id = req.session.user.id
    } 
    BadgeFactory.read({enabled: true, author: author_id}).then(r => {
        res.send(r)
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
}).get('/all/:user_id',(req, res) => {
    let author_id = req.params.user_id
    if (author_id === 'me') {
        author_id = req.session.user.id
    } 
    BadgeFactory.read({author: author_id}).then(r => {
        res.send(r)
    }).catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
})

router.patch('/', (req, res) => {
    if (req.session.user === undefined) {
        res.status(403).send('User must be logged in to perform this action.')
        return 
    }
    req.body.by.author = req.session.user.id
    BadgeFactory.update(req.body.by, req.body.update, (r) => {
        res.send(`${r.nModified} Updated`)
    })
})
.patch('/:badge_id', (req, res) => {
    if (req.session.user === undefined) {
        res.status(403).send('User must be logged in to perform this action.')
        return 
    }
    req.body.author = req.session.user.id 
    BadgeFactory.updateById(req.params.id, req.body)
})



module.exports = router