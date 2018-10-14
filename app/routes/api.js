const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const { registerUser } = require("../controllers/user");
const { syncReqBodyLogger } = require("../helpers");
const { mountLoginMiddleware } = require("../helpers/passport");
//const { createSession } = require("../controllers/session");

const api = express.Router();

api.use(bodyParser.json());
api.use(syncReqBodyLogger);
api.use(passport.initialize()) && mountLoginMiddleware();
api.post("/users", registerUser);
//api.post("/sessions", createSession);

module.exports = api;
