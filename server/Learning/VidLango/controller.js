const express = require('express')
const router = express.Router()
const factory = require('./factory')
const YouTube = require('./YouTube')
const yt = new YouTube() 

// TODO: handle wrong YouTube id : right now it crashed the server
router.get('/yt/:videoId', (req, res) => {
    yt.getVideoDetails(req.params.videoId, (data) => {
        const s = data.items[0].snippet
        const vidLango = {
            video_id: req.params.videoId,
            meta: {
                title: s.title,
                description: s.description,
                categoryId: s.categoryId,
                thumbnails: JSON.stringify(s.thumbnails)
            },
            language: s.defaultAudioLanguage,
            tags: s.tags,
            captions: [],
            author: req.session.user.id
        }
        factory.create(vidLango).then(doc => {
            res.send(doc)
        })
    })
})
.get('/list/', (req, res) => { //:var?
    factory.read({}, (docs) => res.send(docs))
})
.get('/:id', (req, res) => {
    factory.read({_id: req.params.id}, (doc) => {
        res.send(doc)
    })
})

router.post('/sub', (req, res) => {
    /** takes a srt file, converts and returns as json */
    let captions = []

    const srtText = req.files.sub.data.toString('utf8')
    const lines = srtText.split('\n')
    let cap = {};
    let i = 0
    lines.forEach((line) => {
        switch (i) {
            case 0:
                cap.id = line
                i++
                break
            case 1:
                const timeSegments = line.split(' --> ')
                cap.start = timeSegments[0]
                cap.end = timeSegments[1]
                i++
                break
            case 2:
                if (cap.content === undefined) {
                    cap.content = line
                } else if (line === '') {
                    // we are done with the current caption
                    captions.push(cap)
                    cap = {} // Overwrite pointer object
                    i = 0
                } else {
                    // we have a multi-line caption
                    cap.content += '\n'+ line
                }
                break
        }
    })
    let names = req.files.sub.name.split('.')
    const caption = {
        name: names[0],
        lCode: names[1], // Note this may not translate to an exact language code like it could be en_US
        captions: captions
    }
    res.send(caption)
})

router.put('/', (req, res) => {
    const body = {...req.body, snippet: JSON.stringify(req.body.snippet)}
    factory.update({_id: req.body._id, author: req.session.user.id}, body, (doc) => {
        res.send(doc)
    })
})

module.exports = router