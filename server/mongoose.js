const mongoose = require('mongoose')
const mongodb = require('./mongodb.json')

const mongooseOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 5000, 
    useCreateIndex: true, 
    useFindAndModify: false,
    keepAlive: true,
}

async function openConnection(callback) {
    const mg = await mongoose.connect(mongodb.authString, mongooseOptions)
    let connection = mg.connection
    if (callback != null) {
        callback(connection)
    }   
    return connection
}

function closeConnection() {
    mongoose.connection.close()
}

async function checkConnection() {
    if (mongoose.connection.readyState === 0) {
        console.error('no connection to database, attempting a reconnect')
        const conn = await openConnection(() => console.log('connection reopened'))
        if (conn.readyState === 0) {
            console.error('failed to reconnect')
        }
    }
}

module.exports = {
    openConnection,
    closeConnection,
    checkConnection,
    mongooseOptions
}