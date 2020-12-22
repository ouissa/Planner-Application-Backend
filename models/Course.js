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
    type: Number,
    required: true
  },
  "Co-Requisites": [CourseSchema],
  "Pre-Requisites":[CourseSchema],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model user with UserSchema
module.exports = mongoose.model("course", CourseSchema);
