const { user: model } = require("../../models");
const { createResource } = require("../");
const HTTP_STATUS_CODES = require("../../helpers/httpStatusCodes");
const { asyncGenerateBcryptHash } = require("../../models/user/helpers");
const { password: passwordSchema } = require("../users/schemas");
const { validateParams } = require("../../helpers/validators");

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");

  const successCb = user => {
    res.statusCode = HTTP_STATUS_CODES.CREATED;
    req.verifyLoginCredentialsOutput = { error: null, user };
    next();
  };

  const isEmailValidationError = error =>
    error.name === "SequelizeUniqueConstraintError" &&
    error.original.constraint === "users_email_key";

  const errorCb = error => {
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errorDetails = [];
    if (isEmailValidationError(error)) {
      console.log("Duplicate");
      errorDetails = [
        {
          createAccountRequest: {
            accountAlreadyExist: true,
            duplicateEmailAddress: req.body.email
          }
        }
      ];
    } else {
      res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    }
    res.json({ error: true, errorDetails });
  };

  const { body: params } = req;

  const { validatedParams, validationError } = validateParams(
    params.password,
    passwordSchema
  );

  if (!validationError) {
    // Clear text passwords meets validation requirements. Attempt to persist user
    asyncGenerateBcryptHash(params.password, (err, hash) => {
      params.password = hash;
      createResource(params, schema, model, successCb, errorCb, res);
    });
  } else {
    // Clear text passwords does not meet validation requirements. Got ahead and forward
    // request to createResource. The createResource error handling will handle the error
    // but will also add validation errors for other fields in it's response
    createResource(params, schema, model, successCb, errorCb, res);
  }
};

module.exports = {
  create
};
