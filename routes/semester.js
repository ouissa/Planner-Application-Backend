const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const Plan = require("../models/Plan");

// this function takes the user ID from the body of the request
// It constructs a new Degree Plan object for the corresponding student if the information provided is valid
// It addes the new degree plan to the Degree Plans collection
// It returns an error message in the case of a failure in any of the previous steps
function createNewDegreePlan(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  async function find (name, query) {
    let courses = []
    collection = mongoose.connection.db.collection(name)
    courses = collection.find(query).toArray()
    return courses
  }

  var courseList = await find("courses_collection", {})
  // create a new degree plan here
  const studentID = req.body.id;

  const newPlan = {
    studentID,
    semesters: [
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
    courseList: await find("courses_collection", {})
  };

  try {
    Plan.create(newPlan).then(newPlan => {
      console.log("Degree Plan Added ", newPlan);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({"SUCCESS": true});
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error in adding a new degree plan for student with ID bla bla"
    });
  }
}

// this function takes the user ID, and the new Degree Plan from the body of the request
// It searches in the Degree Plan collection the student with the corresponding ID
// It updates the Degree Plan of the student with the new one
// It returns an error message in the case of a failure in any of the previous steps
function saveDegreePlan(req, res) {
  try {
    Plan.updateOne({"studentID": req.body.id}, {
      $set: req.body.newPlan
    }, { new: true })
    .then((plan) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(plan);
          console.log(plan)
          console.log("PUT operation done");
    })

  } catch (e) {
    console.log(e)
    res.send({ message: "Error in Fetching semester information" });
  }
}

// this function takes the user ID from the body of the request
// It searches the Degree Plan Collection using the student ID
// It returns a JSON array of all the matches
// It returns an error message in the case of a failure in any of the previous steps
function findDegreePlan(req, res) {
  try {
    const plan = await Plan.find({"studentID": req.body.id});
    res.json(plan);
    console.log(
      "Semester Endpoint here (GET OPERATION): Communication with the front-end done"
    );
  } catch (e) {
    res.send({ message: "Error in Fetching semester information" });
  }
}

// GET, POST, and PUT requests to the degree plans endpoint marked with "/semesters"
router.post("/", async (req, res) => {
  createNewDegreePlan(req,res);
});

router.get("/", async (req, res) => {
  findDegreePlan(req, res);
});

router.put("/", async (req, res) => {
  saveDegreePlan(req, res);
});

module.exports = router;
