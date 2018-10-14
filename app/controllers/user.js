const Joi = require("joi");
const { User } = require("../models");
const {
  registerUserSchema,
  validatorOptions,
  formatValidationsErrorsForClient
} = require("../helpers/requestValidators");

const registerUser = (req, res, next) => {
  const { error: validationError, value: validatedBody } = Joi.validate(
    req.body,
    registerUserSchema,
    validatorOptions
  );

  if (!validationError) {
    const userRegistrationRequest = User.create(validatedBody);
    userRegistrationRequest.then(user => {
      res.json({ token: "Mock JWT Token" });
    });
    userRegistrationRequest.catch(error => {
      res.json({ error });
    });
  } else {
    const requestParamsErrors = formatValidationsErrorsForClient(
      validationError
    );
    res.json({ requestParamsErrors });
  }
};

module.exports = {
  registerUser
};
