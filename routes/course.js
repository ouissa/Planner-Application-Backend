const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();
const Courses = require("../models/Course");

router.get("/", async (req, res) => {
  try {
    try {

        var list =[];
        res.json(list);

    } catch (e) {
      res.send({ message: "Error in querying courses" });
    }
  } catch (e) {
    res.send({ message: "Error in Fetching semester information" });
  }
});

module.exports = router;
