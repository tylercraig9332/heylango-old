const { MongoClient } = require("mongodb");
const mongodb = require('./mongodb.json')

const client = new MongoClient(mongodb.local);

async function run() {
    try {
        await client.connect()
        console.log("Connected successfully to server");
        const database = client.db('db')
        const collection = database.collection('users');
        const query = { username: 'craigta1' };
        const user = await collection.findOne(query);
        console.log(user);
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

module.exports = {
    run
}