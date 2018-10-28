const express = require("express");
const {
  verifyLoginCredentials,
  create: createSession,
  validateToken,
  destroy: destroySession
} = require("../controllers/sessions/");

const routePrefix = "/sessions";
const router = express.Router();

router
  .route("/")
  .post(verifyLoginCredentials)
  .post(createSession)
  .delete(destroySession);

router.route("/validator").post(validateToken);

module.exports = {
  routePrefix,
  router
};
