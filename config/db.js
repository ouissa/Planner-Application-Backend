const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const mongoUsername = process.env.username;
const mongoPassword = process.env.password;

const MONGOURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@planner.jqdzy.mongodb.net/planner_database?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  const client = new MongoClient(MONGOURI);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("we connected!");

    // Make the appropriate DB calls
    await listDatabases(client);
    const result = await client
      .db()
      .admin()
      .listDatabases().planner_database()

    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function listDatabases(client) {
  var databasesList = await client
    .db()
    .admin()
    .listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => {
    console.log(db.name);
  });
}

module.exports = InitiateMongoServer;
