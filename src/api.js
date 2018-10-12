const express = require("express");
const bodyParser = require("body-parser");
const { registerUser } = require("../controllers/user");
const { syncReqBodyLogger } = require("../helpers/middleware");

const api = express.Router();
api.use(bodyParser.json());

api.use(syncReqBodyLogger);

api.post("/sessions", registerUser);

module.exports = api;
