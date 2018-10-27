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
    debugger;
    res.statusCode = CREATED;
    const { user: userDbInstance } = req.verifyLoginCredentialsOutput;
    const { firstName, lastName, email } = userDbInstance;
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

  const sendInvalidParamsResponse = () => {
    res.statusCode = UNPROCESSABLE_ENTITY;
    res.json({ errors: formatSchemaValidationErrors(validationError) });
  };

  const authenticateCredentials = () =>
    passport.authenticate(
      "local",
      { failureRedirect: "/login" },
      (error, user, message) => {
        req.verifyLoginCredentialsOutput = { error, user, message };
        console.log(message);
        next();
      }
    )(req, res, next);

  console.log(!validationError);

  !validationError ? authenticateCredentials() : sendInvalidParamsResponse();
};

module.exports = {
  verifyLoginCredentials,
  create
};
