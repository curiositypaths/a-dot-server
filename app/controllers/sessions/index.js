const passport = require("passport");
const { Session: model } = require("../../models");
const { createResource } = require("../");
const { issueToken } = require("../../helpers/jwt");
const { generateSessionParams } = require("./helpers");
const { authenticate: schema } = require("./schemas");
const {
  validateParams,
  formatSchemaValidationErrors
} = require("../../helpers/validators");
const {
  CREATED,
  UNPROCESSABLE_ENTITY
} = require("../../helpers/httpStatusCodes");

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");

  const successCb = () => {
    res.statusCode = CREATED;
    res.json({ jwtToken });
  };

  const errorCb = error => {
    res.statusCode = UNPROCESSABLE_ENTITY;
    res.json({ error });
  };

  const { user } = req.verifyLoginCredentialsOutput;
  const { jwtToken, payload } = issueToken(req.body);
  const params = generateSessionParams(user, payload);
  createResource(params, schema, model, successCb, errorCb, res);
};

const verifyLoginCredentials = (req, res, next) => {
  const { validatedParams, validationError } = validateParams(req.body, schema);

  const sendInvalidParamsResponse = () => {
    res.json({ errors: formatSchemaValidationErrors(validationError) });
  };

  const authenticateCredentials = () =>
    passport.authenticate(
      "local",
      { failureRedirect: "/login" },
      (error, user, message) => {
        req.verifyLoginCredentialsOutput = { error, user, message };
        next();
      }
    )(req, res, next);

  !validationError ? authenticateCredentials() : sendInvalidParamsResponse();
};

module.exports = {
  verifyLoginCredentials,
  create
};