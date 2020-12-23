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

router.get("/:courseCode", async (req, res) => {
  try {
    const allCourses = await InitiateMongoServer()
    const courseCode = req.params.courseCode
    console.log("looking for: " + courseCode)
    allCourses.forEach(course => {
      CON
      if (course["Course Code"] == courseCode) {
        res.json(course);
      }
    })
    throw new Error("Course Not Found");
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in getting the course you want" });
  }
});

module.exports = router;
