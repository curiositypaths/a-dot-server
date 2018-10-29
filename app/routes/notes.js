const express = require("express");
const { authenticateSession } = require("../controllers/sessions/");
const { create: createNote } = require("../controllers/notes");

const routePrefix = "/notes";
const router = express.Router();

router
  .route("/")
  .post(authenticateSession)
  .post(createNote);

module.exports = {
  routePrefix,
  router
};
