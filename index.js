const express = require("express");
const bodyParser = require("body-parser");
const semester = require("./routes/semester"); //new addition
const InitiateMongoServer = require("./config/db");
const path = require("path");
var cors = require("cors");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/semesters", semester);

app.listen(PORT, (req, res) => {
  console.log("Server Started at PORT ${PORT}");
});
