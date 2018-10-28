const express = require("express");
const {
  verifyLoginCredentials,
  create,
  validateToken,
  destroy
} = require("../controllers/sessions/");

const routePrefix = "/sessions";
const router = express.Router();

router
  .route("/")
  .post(verifyLoginCredentials)
  .post(create)
  .delete(destroy);

router.route("/validator").post(validateToken);

module.exports = {
  routePrefix,
  router
};
