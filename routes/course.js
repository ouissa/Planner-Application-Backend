const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const Courses = require("../models/Course");

router.get("/", async (req, res) => {
  try {
    var list = Courses.find({});
      
    res.json(list);
    console.log(
      "Course Endpoint here (GET OPERATION): Communication with the front-end done"
    );
  } catch (e) {
    res.send({ message: "Error in Fetching semester information" });
  }
});

module.exports = router;
