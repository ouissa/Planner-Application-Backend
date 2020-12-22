const mongoose = require("mongoose");

const mongoUsername = process.env.username;
const mongoPassword = process.env.password;

const MONGOURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@planner.jqdzy.mongodb.net/planner_database?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
      const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


module.exports = InitiateMongoServer;
