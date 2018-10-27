const express = require("express");
const {
  verifyLoginCredentials,
  create,
  destroy
} = require("../controllers/sessions/");

const routePrefix = "/sessions";
const router = express.Router();

router
  .route("/")
  .post(verifyLoginCredentials)
  .post(create)
  .delete(destroy);

module.exports = {
  routePrefix,
  router
};
