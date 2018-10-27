const { User: model } = require("../../models");
const { createResource } = require("../");
const HTTP_STATUS_CODES = require("../../helpers/httpStatusCodes");
const { asyncGenerateBcryptHash } = require("../../models/user/helpers");
const { password: passwordSchema } = require("../users/schemas");
const { validateParams } = require("../../helpers/validators");

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

  const { validatedParams, validationError } = validateParams(
    params.password,
    passwordSchema
  );

  if (!validationError) {
    // Clear text passwords meets the requirements. Attempt to persist user
    asyncGenerateBcryptHash(params.password, (err, hash) => {
      params.password = hash;
      createResource(params, schema, model, successCb, errorCb, res);
    });
  } else {
    // Clear text passwords does not meet the requirements. Got ahead and forward
    // request to createResource. It will fail but it will collect additional validation
    // errors
    createResource(params, schema, model, successCb, errorCb, res);
  }
};

module.exports = {
  create
};
