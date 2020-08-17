 const Comment = require('./Comment')
 
 async function create(data) {
    let c = new Comment(data)
    await c.save()
    return c
 }

 async function read(body) {
    let comments = await Comment.find(body, null, {sort: '-_id', limit: 100}, async (err, d) => {
        if (err) throw new Error(err)
        return d
    })
    return comments
 }

 function update(identifier, body) {
    Comment.updateOne(identifier, body, (error, res) => {
        if (error) throw new Error(error.toString())
    })
 }

 function _delete() {

 }

 module.exports = {
     create,
     read,
     update,
     _delete
 }
 