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


    const result = await client
      .db("planner_database")
      .collection("courses_collection")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
      });

    console.log(result);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};

async function returnClient(client) {
 return client;
}

module.exports = InitiateMongoServer;
