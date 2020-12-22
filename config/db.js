const mongoose = require("mongoose");

mongoUsername = proces.env.username;
mongoPass = process.env.password;

const MONGOURI = "mongodb+srv://${process.env.username}:${process.env.mongoPass}@planner.jqdzy.mongodb.net/planner_database?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to Planner DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};




module.exports = InitiateMongoServer;