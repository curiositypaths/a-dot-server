const { User: model } = require("../../models");
const { createResource } = require("../");
const HTTP_STATUS_CODES = require("../../helpers/httpStatusCodes");

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");

  const successCb = user => {
    res.statusCode = HTTP_STATUS_CODES.CREATED;
    req.verifyLoginCredentialsOutput = { error: null, user, message: null };
    next();
  };

  const isEmailValidationError = error =>
    error.name === "SequelizeUniqueConstraintError" &&
    error.original.constraint === "Users_email_key";

  const errorCb = error => {
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errors;
    if (isEmailValidationError(error)) {
      errors = {
        account: {
          accountAlreadyExist: true,
          duplicateEmailAddress: req.body.email
        }
      };
    } else {
      errors = {
        wasAccountCreationRequestSuccessful: false
      };
    }

    res.json({ errors });
  };

  const { body: params } = req;

  createResource(params, schema, model, successCb, errorCb, res);
};

module.exports = {
  create
};
