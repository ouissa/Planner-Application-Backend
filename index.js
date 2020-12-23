const express = require("express");
const bodyParser = require("body-parser");
const semester = require("./routes/semester"); //new addition
const course = require("./routes/course"); //new addition
const InitiateMongoServer = require("./config/db");
const path = require("path");
var cors = require("cors");

// Initiate Mongo Server
var allCourses = InitiateMongoServer();
module.exports = allCourses;

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/semesters", semester);
app.use("/course", course);

app.listen(PORT, (req, res) => {
  console.log("Server Started at PORT ${PORT}");
});
