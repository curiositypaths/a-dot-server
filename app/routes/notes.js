const express = require("express");
const { authenticateSession } = require("../controllers/sessions/");
const {
  create: createNote,
  update: updateNote,
  read: readNote
} = require("../controllers/notes");

const routePrefix = "/notes";
const router = express.Router();

router.use(authenticateSession);

router.route("/").post(createNote);

router
  .route("/:publicId")
  .get(readNote)
  .put(updateNote);

module.exports = {
  routePrefix,
  router
};
