const express = require("express");
const { check, validationResult } = require("express-validator");
const InitiateMongoServer = require("../config/db");


const router = express.Router();
const Courses = require("../models/Course");

router.get("/", async (req, res) => {
  try {
    const allCourses = await InitiateMongoServer()
    res.json(allCourses);
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in querying courses" });
  }
});

module.exports = router;
