const express = require("express");
const { check, validationResult } = require("express-validator");
const InitiateMongoServer = require("../config/db");

const router = express.Router();
const Courses = require("../models/Course");

router.get("/", async (req, res) => {
  try {
    var list = [];
    const client = InitiateMongoServer();
    client.connect()
    const stg = await client
      .db("planner_database")
      .collection("courses_collection")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        list.push(result);
        console.log(result);
    });
    console.log(stg);
    res.json(list);
  } catch (e) {
    console.log(e)
    res.send({ message: "Error in querying courses" });
  }
});

module.exports = router;
