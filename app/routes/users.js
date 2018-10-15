const express = require("express");
const { create } = require("../controllers/users/");

const usersRouterPrefix = "/users";
const usersRouter = express.Router();

usersRouter.post("/", create);

module.exports = {
  usersRouterPrefix,
  usersRouter
};
