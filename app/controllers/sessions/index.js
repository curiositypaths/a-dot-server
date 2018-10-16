const passport = require("passport");
const { Session: model } = require("../../models");
const { createResource } = require("../../helpers/restfulControllers");
const { issueToken } = require("../../helpers/jwt");
const { generateSessionParams } = require("./helpers");

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");

  const successCb = session => res.json({ session });
  const errorCb = error => res.json({ error });

  const { user } = req.verifyLoginCredentialsOutput;
  const { jwtToken, payload } = issueToken(req.body);
  const params = generateSessionParams(user, payload);
  createResource(params, schema, model, successCb, errorCb, res);
};

const verifyLoginCredentials = (req, res, next) => {
  passport.authenticate(
    "local",
    { failureRedirect: "/login" },
    (error, user, message) => {
      req.verifyLoginCredentialsOutput = { error, user, message };
      next();
    }
  )(req, res, next);
};

module.exports = {
  verifyLoginCredentials,
  create
};
