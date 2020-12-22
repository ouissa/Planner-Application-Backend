const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({

  "Course Code": {
    type: String,
    required: true
  },
  "Course Title": {
    type: String,
    required: true
  },
  "Credits": {
    type: String,
    required: true
  },
  "Co-Requisites": [String],
  "Pre-Requisites":[String],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("Course", CourseSchema);
