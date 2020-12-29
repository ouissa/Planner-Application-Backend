const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const Plan = require("../models/Plan");

router.post("/", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  // create a new degree plan here
  const newPlan = {
    "studentID": "123456",
    "semesters": [
      {
        id: "semester-0",
        title: "Fall 2018",
        courses: []
      },
      {
        id: "semester-1",
        title: "Spring 2019",
        courses: []
      },
      {
        id: "semester-2",
        title: "Summer 2019",
        courses: []
      },
      {
        id: "semester-3",
        title: "Fall 2019",
        courses: []
      },
      {
        id: "semester-4",
        title: "Spring 2020",
        courses: []
      },
      {
        id: "semester-5",
        title: "Summer 2020",
        courses: []
      },
      {
        id: "semester-6",
        title: "Fall 2020",
        courses: []
      },
      {
        id: "semester-7",
        title: "Spring 2021",
        courses: []
      },
      {
        id: "semester-8",
        title: "Summer 2021",
        courses: []
      },
      {
        id: "semester-9",
        title: "Fall 2021",
        courses: []
      },
      {
        id: "semester-10",
        title: "Spring 2022",
        courses: []
      },
      {
        id: "semester-11",
        title: "Summer 2022",
        courses: []
      }
    ],
    "courseList": []
  };
  try {
    Plan.create(newPlan).then(newPlan => {
      console.log("Degree Plan Added ", newPlan);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({"SUCCESSS": true});
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error in adding a fucking new degree plan"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const plan = await Plan.find({"student"});
    res.json(plan);
    console.log(
      "Semester Endpoint here (GET OPERATION): Communication with the front-end done"
    );
  } catch (e) {
    res.send({ message: "Error in Fetching semester information" });
  }
});

module.exports = router;
