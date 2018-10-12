const express = require("express");
const bodyParser = require("body-parser");
const { registerUser } = require("../controllers/user");
const { syncReqBodyLogger } = require("../helpers/middleware");

const api = express.Router();
api.use(bodyParser.json());

api.use(syncReqBodyLogger);

api.post("/sessions", (req, res, next) => {
  const userRegistrationRequest = registerUser(req, res, next);

  userRegistrationRequest.then(user => {
    res.json({ user });
  });

  userRegistrationRequest.catch(error => {
    res.json({ error });
  });
});

module.exports = api;
