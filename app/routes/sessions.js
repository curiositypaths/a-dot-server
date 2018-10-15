const express = require("express");
const { create } = require("../controllers/sessions/");

const routePrefix = "/sessions";
const router = express.Router();

router.post("/", create);

module.exports = {
  routePrefix,
  router
};
