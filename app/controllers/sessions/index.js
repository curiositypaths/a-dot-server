const passport = require("passport");
const { session: model } = require("../../models");
const { user } = require("../../models");
const { createResource } = require("../");
const { issueToken, verifyJwtToken } = require("../../helpers/jwt");
const { generateSessionParams } = require("./helpers");
const { authenticate: schema } = require("./schemas");
const {
  validateParams,
  formatSchemaValidationErrors
} = require("../../helpers/validators");
const Sequelize = require("sequelize");
const HTTP_STATUS_CODES = require("../../helpers/httpStatusCodes");
const {
  skipSessionAuthenticationWhiteList
} = require("../../config/skipSessionAuthenticationWhiteList");

const verifyLoginCredentials = (req, res, next) => {
  const { validatedParams, validationError } = validateParams(req.body, schema);

  const returnedFailedAuthenticationNotice = () => {
    res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
    res.json({
      error: true,
      errorDetails: { createSession: "Invalid credentials" }
    });
  };

  const authenticateCredentials = () => {
    passport.authenticate("local", {}, (error, user, message) => {
      if (error) {
        returnedFailedAuthenticationNotice();
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

const validateToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const jwtToken = authorizationHeader.slice(7);
    const verifiedJwtToken = verifyJwtToken(jwtToken);
    const { sessionToken } = verifiedJwtToken;

    if (Date.now() >= verifiedJwtToken.exp) {
      res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
      res.send();
    } else {
      const handleDbResponse = session => {
        if (session) {
          const { firstName, lastName, email } = session.user;
          res.statusCode = HTTP_STATUS_CODES.OK;
          res.json({ firstName, lastName, email });
        } else {
          res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
          res.send();
        }
      };

      const handleDbRequestError = error => {
        res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        res.send();
      };
      model
        .findOne({
          where: { sessionToken },
          include: [{ model: user }]
        })
        .then(handleDbResponse)
        .catch(handleDbRequestError);
    }
  } catch (error) {
    res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
    res.send();
  }
};

const reqDoesNotRequireAuthentication = req => {
  const { originalUrl: reqPath } = req;
  const { method: reqMethod } = req;

  // This method enforces the skip sessions authentication white list. Handle with care.
  // To-do: Add test
  const canRequestSkipSessionAuthentication = skipSessionAuthenticationWhiteList.some(
    ({ method, path }) => path === reqPath && method === reqMethod
  );
  return canRequestSkipSessionAuthentication;
};

const authenticateSession = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const jwtToken = authorizationHeader.slice(7);
    const verifiedJwtToken = verifyJwtToken(jwtToken);
    const { sessionToken } = verifiedJwtToken;

    if (Date.now() >= verifiedJwtToken.exp) {
      res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
      res.send();
    } else {
      const handleDbResponse = session => {
        if (session) {
          req.user = session.user;
          next();
        } else {
          res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
          res.send();
        }
      };

      const handleDbRequestError = error => {
        res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        res.send();
      };
      model
        .findOne({
          where: { sessionToken },
          include: [{ model: user }]
        })
        .then(handleDbResponse)
        .catch(handleDbRequestError);
    }
  } catch (error) {
    res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
    res.send();
  }
};

// This method enforces the skip sessions authentication white list. Handle with care.
// To-do: Add test
const applySessionAuthenticationRules = (req, res, next) => {
  if (reqDoesNotRequireAuthentication(req)) {
    next();
  } else {
    authenticateSession(req, res, next);
  }
};

const destroy = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    const jwtToken = authorizationHeader.slice(7);
    const verifiedJwtToken = verifyJwtToken(jwtToken);
    const { sessionToken } = verifiedJwtToken;

    const handleDbResponse = numberOfRecordsDeleted => {
      if (numberOfRecordsDeleted === 1) {
        res.statusCode = HTTP_STATUS_CODES.NO_CONTENT;
      } else {
        res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
      }
      res.send();
    };

    const handleDbRequestError = error => {
      res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
      res.send();
    };

    model
      .destroy({ where: { sessionToken } })
      .then(handleDbResponse)
      .catch(handleDbRequestError);
  } catch (error) {
    res.statusCode = HTTP_STATUS_CODES.UNAUTHORIZED;
    res.send();
  }
};

module.exports = {
  verifyLoginCredentials,
  create,
  destroy,
  validateToken,
  authenticateSession,
  applySessionAuthenticationRules
};
