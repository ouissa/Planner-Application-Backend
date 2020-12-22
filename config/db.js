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
    console.log("Successfully Connested to The Planner Database");
    return client

  } catch (e) {
    console.error(e);
  } 
};


module.exports = InitiateMongoServer;
