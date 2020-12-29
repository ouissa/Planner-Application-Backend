const mongoose = require("mongoose");


const courseSchema = mongoose.Schema({
  "Course Code": {
    type: String,
    required: true
  },
  "Course Title": {
    type: String,
    required: true
  },
  Credits: {
    type: String,
    required: true
  },
  "Co-Requisites": [String],
  "Pre-Requisites": [String],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with Degree Plan Schema
module.exports = mongoose.model("course_collection", courseSchema);