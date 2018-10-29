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

router.post("/", createNote);
router.put("/", updateNote);
router.get("/:publicId", readNote);

//router.get("/:publicId", readNote);

module.exports = {
  routePrefix,
  router
};
