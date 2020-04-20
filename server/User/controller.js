const express = require('express')
const router = express.Router()
const model = require('./factory.js')

router.get('/loggedIn', (req, res) => {
    const logged = req.session.user !== undefined
    res.status(logged ? 200 : 400).send(logged)
})
.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) res.status(400).send("Error Occurred when logging out")
        else res.status(200).send('Logged out')
    })
})
.get('/me', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('user not logged in')
    }
    res.send(req.session.user)
})
.get('/:id', (req, res) => {
    model.read({_id: req.params.id}).then((r) => {
        res.send(r)
    })
})


router.post('/signup', (req, res) => {
    if (req.body.username === undefined && req.body.password === undefined) {
        console.log("Missing body...")
        res.send("Error: missing request body...")
        return
    }
    model.create(req.body).then((user) => {
        req.session.user = user
        res.sendStatus(200)
    })
    .catch((e) => {
        console.log(e)
        if(e.code != undefined && e.code === 11000) {
            res.status(400)
            res.statusMessage = 'Username already in use.'
            res.send('Username already in use.')
        }
        else {
            res.send(error)
        }
    })
})
.post('/login', (req, res) => {
    if (req.body.username === undefined && req.body.password === undefined) {
        console.log("Missing body...")
        res.send("Error: missing request body...")
        return
    }
    model.validate(req.body).then((user) => {
        req.session.user = user
        res.status(200).send(user)
    })
    .catch(e => {
        console.log(e.message)
        res.statusMessage = e.message
        res.status(400).send(e)
    })
})

module.exports = router
