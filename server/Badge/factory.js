const Resource = require('./Badge')
/**
 * 
 * @param {string} type the badge type
 * @param {string} user the string id of the user
 * @param {string} custom Custom text for specific types of badges
 */
function create(type, user, custom='') {
    let b = new Resource({type: type, author: user, custom: custom})
    return b.save()
}

async function read(body) {
    const badges = await Resource.find(body, (err, doc) => {
        if (err) throw new Error(err)
    })
    return badges
}


module.exports = {
    create,
    read
}