const express = require("express");
const { authenticateRequest, create } = require("../controllers/sessions/");

const routePrefix = "/sessions";
const router = express.Router();

router.post("/", verifyLoginCredentials);
router.post("/", create);

module.exports = {
  routePrefix,
  router
};
