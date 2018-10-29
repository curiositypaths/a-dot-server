const express = require("express");
const { authenticateSession } = require("../controllers/sessions/");
const {
  create: createNote,
  update: updateNote
} = require("../controllers/notes");

const routePrefix = "/notes";
const router = express.Router();

router
  .route("/")
  .post(authenticateSession)
  .post(createNote)
  .put(updateNote);

module.exports = {
  routePrefix,
  router
};
