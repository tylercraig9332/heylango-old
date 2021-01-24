import express, { Request } from "express"
import UserFactory from './factory'
import IUser from '../../typings/User'

import BadgeFactory from './Badge/factory'
import SettingFactory from './UserSettings/factory'
import InteractionFactory from '../Interaction/factory'

const router = express.Router()

router.get('/loggedIn', (req, res) => {
    const logged = req.session.user !== undefined
    res.status(200).send(logged)
})
.get('/logout', (req, res) => {
    req.session.destroy((err : any) => {
        if (err) res.status(400).send("Error Occurred when logging out")
        else res.status(200).send('Logged out')
    })
})
.get('/me', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('user not logged in')
    }
    res.send(req.session.user)
})/*
.get('/setting', (req, res) => {
    if (req.session.user === undefined) {
        res.status(200).send('user not logged in')
        return
    }
    SettingFactory.read(req.session.user._id, (err, docs) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(docs)
        }
    })
})*/
.get('/:id', (req, res) => {
    UserFactory.read({_id: req.params.id}, (err : any, user : IUser) => {
        if (err) {
            res.status(500).send(err.message)
        }
        res.send(user)
    })
})


/*.post('/signup', (req, res) => {
    if (req.body.form.username === undefined && req.body.form.password === undefined) {
        console.log("Missing body...")
        res.send("Error: missing request body...")
        return
    }
    model.create(req.body.form).then((user) => {
        BadgeFactory.create('custom', user._id, 'English')
        SettingFactory.create(user._id, {primaryLanguage: 'en', targetLanguages: req.body.languages})
        InteractionFactory.create_score({user: user._id, points: 0, lastUpdated: Date.now()})
        req.session.user = user
        res.sendStatus(200)
    })
    .catch((e : any) => {
        console.log(e)
        if(e.code != undefined && e.code === 11000) {
            res.status(400)
            res.statusMessage = 'Username already in use.'
            res.send('Username already in use.')
        }
        else {
            res.status(500).send(e)
        }
    })
})*/
router.post('/login', (req, res) => {
    console.log('logging in...')
    if (req.body.username === undefined && req.body.password === undefined) {
        console.log("Missing body...")
        res.send("Error: missing request body...")
        return
    }
    UserFactory.validate(req.body, (err : string, user : IUser) => {
        if (err || user === null) {
            console.error('Validation failed:', err)
            res.statusMessage = (err === undefined) ? 'Something went wrong: Validation Failed' : err
            res.status(500).send(err)
        } else {
            req.session.user = user
            res.status(200).send(user)
        }
    })
})/*
.post('/setting', (req, res) => {
    if (req.session.user === undefined) {
        res.status(400).send('user not logged in')
    }
    SettingFactory.update(req.session.user._id, req.body, (err, docs) => {
        if (err) {
            console.error(err)
            res.status(500).send(err)
        } else if (docs == null) {
            SettingFactory.create(req.session.user._id, req.body)
        }
        else {
            res.send(docs)
        }
    })
})*/

export default router
