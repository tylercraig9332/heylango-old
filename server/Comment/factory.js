const Comment = require('./Comment')
const mongoose = require('mongoose')

 async function create(data) {
    let c = new Comment(data)
    await c.save()
    return c
 }

 async function read(body) {
    let comments = await Comment.find(body, null, {sort: '-_id', limit: 100}, async (err, d) => {
        if (err) throw new Error(err)
        
        return await _addTimeStamp(d)
    })
    return _addTimeStamp(comments)
 }

 function update(identifier, body) {
    Comment.updateOne(identifier, body, (error, res) => {
        if (error) throw new Error(error.toString())
    })
 }

 function _delete() {

 }

 async function _addTimeStamp(docs) {
    let d = await docs.map(doc => {
        return {
            ...doc._doc,
            createdAt: doc._id.getTimestamp()
        }
    })
    return d
 }

 module.exports = {
     create,
     read,
     update,
     _delete
 }
 