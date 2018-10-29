const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const { applySessionAuthenticationRules } = require("../controllers/sessions");
const { mountLoginMiddleware } = require("../config/passport");
const { usersRouter } = require("./users");
const {
  usersRouterPrefix,
  sessionsRouterPrefix,
  notesRouterPrefix
} = require("./routePrefixes");
const { router: notesRouter } = require("./notes");
const { router: sessionsRouter } = require("./sessions");

const apiRouterPrefix = "/api/v1";
const apiRouter = express.Router();

const corsOptions = {
  origin: process.env.WEB_CLIENT_ADDRESS,
  methods: ["GET", "POST", "PUT", "DELETE"],
  "Access-Control-Max-Age": 600,
  optionsSuccessStatus: 200 // some legacy browsers choke on 204
};

apiRouter.use(cors(corsOptions));

apiRouter.use(bodyParser.json());
apiRouter.use(applySessionAuthenticationRules);
apiRouter.use(passport.initialize()) && mountLoginMiddleware();
apiRouter.use(usersRouterPrefix, usersRouter);
apiRouter.use(sessionsRouterPrefix, sessionsRouter);
apiRouter.use(notesRouterPrefix, notesRouter);

module.exports = {
  apiRouter
};
