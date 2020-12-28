const mongoose = require("mongoose");

var semesterSchema = new Schema({
    id:  {
        type: String,
        required: true
    },
    title:  {
        type: String,
        required: true
    },
    courses: [courseSchenma]
}, {
    timestamps: true
});


var semesterSchema = new Schema({
    id:  {
        type: String,
        required: true
    },
    title:  {
        type: String,
        required: true
    },
    courses: [courseSchenma]
}, {
    timestamps: true
});

const DegreeSchema = mongoose.Schema({

  "semesters": {
    type: [semesterSchema],
    required: true
  },
  "courseList": {
    type: [CourseSchema],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with Degree Plan Schema
module.exports = mongoose.model("degreePlan", DegreeSchema);
