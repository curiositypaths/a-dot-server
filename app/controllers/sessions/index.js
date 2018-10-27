const passport = require("passport");
const { Session: model } = require("../../models");
const { createResource } = require("../");
const { issueToken, verifyJwtToken } = require("../../helpers/jwt");
const { generateSessionParams } = require("./helpers");
const { authenticate: schema } = require("./schemas");
const {
  validateParams,
  formatSchemaValidationErrors
} = require("../../helpers/validators");
const HTTP_STATUS_CODES = require("../../helpers/httpStatusCodes");

const verifyLoginCredentials = (req, res, next) => {
  const { validatedParams, validationError } = validateParams(req.body, schema);

  const returnedFailedAuthenticationNotice = () =>
    res.json({ errors: { wasAuthenticationRequestSuccessful: false } });

  const authenticateCredentials = () => {
    passport.authenticate("local", {}, (error, user, message) => {
      if (error) {
        res.json({ errors: { wasAuthenticationRequestSuccessful: false } });
      } else {
        req.verifyLoginCredentialsOutput = { error, user, message };
        next();
      }
    })(req, res, next);
  };
  !validationError
    ? authenticateCredentials()
    : returnedFailedAuthenticationNotice();
};

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");

  const successCb = () => {
    res.statusCode = HTTP_STATUS_CODES.CREATED;
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
    // the sessions create fn should only be invoked after a successful
    // user authentication or creation. Meaning we should have all the
    // parameters required to successfully create a session. If something
    // goes wrong it must be due to something we are doing wrong. Due to
    // this reason this method should return a 500 status code
    res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    res.json({
      errors: {
        wasSessionCreationRequestSuccessful: false
      }
    });
  };

  const { user } = req.verifyLoginCredentialsOutput;
  const { jwtToken, payload } = issueToken(req.body);
  const params = generateSessionParams(user, payload);
  createResource(params, schema, model, successCb, errorCb, res);
};

const destroy = (req, res, next) => {
  const authorizationHeader = req.get("Authorization");
  const jwtToken = authorizationHeader.slice(7);
  const verifiedJwtToken = verifyJwtToken(jwtToken);
  const { sessionToken } = verifiedJwtToken;
  console.log("Session token is", sessionToken);
  debugger;

  const successCb = () => {
    debugger;
  };

  const errorCb = error => {
    res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    res.json({
      errors: {
        wasSessionDestroyRequestSuccessful: false
      }
    });
  };

  debugger;
};

module.exports = {
  verifyLoginCredentials,
  create,
  destroy
};
