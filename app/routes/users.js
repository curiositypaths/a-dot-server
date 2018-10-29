const express = require("express");
const { create: createUser } = require("../controllers/users/");
const { create: createSession } = require("../controllers/sessions");

const usersRouter = express.Router();

usersRouter
  .route("/")
  .post(createUser)
  .post(createSession);

module.exports = {
  usersRouter
};
