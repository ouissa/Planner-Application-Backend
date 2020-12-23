const express = require("express");
const { check, validationResult } = require("express-validator");
const allCourses = require("../index");

const router = express.Router();
const Courses = require("../models/Course");

router.get("/", async (req, res) => {
  try {

    res.json(allCourses);
  } catch (e) {
    console.log(e);
    res.send({ message: "Error in querying courses" });
  }
});

module.exports = router;
