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
    const { user: userInstance } = req.verifyLoginCredentialsOutput;
    const { firstName, lastName, email } = userInstance;
    const user = {
      firstName,
      lastName,
      email
    };
    res.json({ jwtToken, user });
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

  const returnedFailedAuthenticationNotice = () =>
    res.json({ errors: { wasAuthenticationRequestSuccessful: false } });

  const authenticateCredentials = () =>
    passport.authenticate(
      "local",
      { failureRedirect: "/login" },
      (error, user, message) => {
        if (error) {
          returnedFailedAuthenticationNotice();
        } else {
          req.verifyLoginCredentialsOutput = { error, user, message };
          next();
        }
      }
    )(req, res, next);
  debugger;
  !validationError
    ? authenticateCredentials()
    : returnedFailedAuthenticationNotice();
};

module.exports = {
  verifyLoginCredentials,
  create
};
