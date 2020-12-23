const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const mongoUsername = process.env.username;
const mongoPassword = process.env.password;

const MONGOURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@planner.jqdzy.mongodb.net/planner_database?retryWrites=true&w=majority`;
const allCourses = [];

const InitiateMongoServer = async () => {
  try {
    const client = new MongoClient(MONGOURI);
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Successfully Connested to The Planner Database");
    const stg = await client
      .db("planner_database")
      .collection("courses_collection")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        allCourses.push(result);
        console.log(result);
      });
    return allCourses;
  } catch (e) {
    console.error(e);
  }
};

module.exports = InitiateMongoServer;
