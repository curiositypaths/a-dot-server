const express = require("express");
const { registerUser } = require("../controllers/user");

const usersRouterPrefix = "/users";
const usersRouter = express.Router();

usersRouter.post("/", registerUser);

module.exports = {
  usersRouterPrefix,
  usersRouter
};
