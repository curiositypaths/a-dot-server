const express = require("express");
const { verifyLoginCredentials, create } = require("../controllers/sessions/");

const routePrefix = "/sessions";
const router = express.Router();

router
  .route("/")
  .post(verifyLoginCredentials)
  .post(create);

router.route("/").delete(verifyLoginCredentials);

module.exports = {
  routePrefix,
  router
};
