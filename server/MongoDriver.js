const { data } = require("autoprefixer");
const { MongoClient } = require("mongodb");
const mongodb = require('./mongodb.json')

const client = new MongoClient(mongodb.local, { useUnifiedTopology: true });

async function run() {
    try {
        await client.connect()
        const database = client.db('db')
        return database
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

module.exports = {
    run,
}