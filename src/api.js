const express = require("express");
const bodyParser = require("body-parser");
const { registerUser } = require("../controllers/user");

const api = express.Router();
api.use(bodyParser.json());

api.use(function(req, res, next) {
  console.log("Req is :", req);
  next();
});

api.post("/session", (req, res, next) => {
  console.log("fasfasdfasdf");
  registerUser(req, res, next);
});

module.exports = api;
