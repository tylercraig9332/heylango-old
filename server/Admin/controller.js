const express = require('express')
const router = express.Router()

const report = require('./factory')

router.post('/report', (req, res) => {
    let madeBy = null
    if (req.session.user !== undefined) madeBy = req.session.user._id
    req.body.madeBy = madeBy
    report.create(req.body).then(d => res.send(d)).catch(err => {
        console.error(err); res.status(400).send(err)
    })
})

module.exports = router