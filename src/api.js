const express = require("express");
const bodyParser = require("body-parser");
const { registerUser } = require("../controllers/user");

const api = express.Router();
api.use(bodyParser.json());

api.use(function(req, res, next) {
  console.log("In API ---------------------", req);
  next(req, res, next);
});

api.post("sessions", (req, res, next) => {
  console.log("In API POST", req);
  registerUser(req, res, next);
});

module.exports = api;
