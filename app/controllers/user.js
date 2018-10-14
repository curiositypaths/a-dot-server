const Joi = require("joi");
const { User } = require("../models");
const { registerUserSchema } = require("../helpers/requestValidators");

const registerUser = (req, res, next) => {
  const { error: validationError, value: validatedBody } = Joi.validate(
    req.body,
    registerUserSchema
  );

  const userRegistrationRequest = User.create(validatedRequestBody);
  userRegistrationRequest.then(user => {
    res.json({ token: "Mock JWT Token" });
  });

  userRegistrationRequest.catch(error => {
    res.json({ error });
  });
};

module.exports = {
  registerUser
};
