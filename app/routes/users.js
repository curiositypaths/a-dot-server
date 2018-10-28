const express = require("express");
const { create: createUser } = require("../controllers/users/");
const { create: createSession } = require("../controllers/sessions");

const usersRouterPrefix = "/users";
const usersRouter = express.Router();

usersRouter
  .route("/")
  .post(createUser)
  .post(createSession);

module.exports = {
  usersRouterPrefix,
  usersRouter
};
