const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const { mountLoginMiddleware } = require("../helpers/passport");
const { usersRouterPrefix, usersRouter } = require("./users");

const apiRouterPrefix = "/api/v1";
const apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(passport.initialize()) && mountLoginMiddleware();
apiRouter.use(usersRouterPrefix, usersRouter);

module.exports = {
  apiRouter,
  apiRouterPrefix
};
