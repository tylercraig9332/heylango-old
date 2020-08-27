const express = require('express')
const router = express.Router()

const BadgeFactory = require('./factory')

router.get('/:user_id',(req, res) => {
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

module.exports = router