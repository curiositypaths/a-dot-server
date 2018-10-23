const express = require("express");
const { create } = require("../controllers/users/");
const { create: createSession } = require("../controllers/sessions");

const usersRouterPrefix = "/users";
const usersRouter = express.Router();

usersRouter
  .route("/")
  .post(create)
  .post(createSession);

module.exports = {
  usersRouterPrefix,
  usersRouter
};
