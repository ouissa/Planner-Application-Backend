const mongoose = require("mongoose");

const courseSchema = require("course_collection");

var semesterSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    courses: [courseSchema]
  },
  {
    timestamps: true
  }
);

const PlanSchema = mongoose.Schema({
  "studentID": {
    type: String,
    required:true
  },
  semesters: {
    type: [semesterSchema],
    required: true
  },
  courseList: {
    type: [courseSchema],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with Degree Plan Schema
module.exports = mongoose.model("plan", PlanSchema);
