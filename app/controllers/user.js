const Joi = require("joi");
const { issueToken, parseJwtToken } = require("../helpers/jwt");
const { User, Session } = require("../models");
const {
  registerUserSchema,
  validatorOptions,
  formatValidationsErrorsForClient
} = require("../helpers/requestValidators");
const { generateSessionParams } = require("../helpers");

const registerUser = (req, res, next) => {
  const { error: validationError, value: validatedBody } = Joi.validate(
    req.body,
    registerUserSchema,
    validatorOptions
  );

  const sendResponse = response => res.json(response);

  if (!validationError) {
    const userRegistrationRequest = User.create(validatedBody);
    userRegistrationRequest.then(user => {
      const jwtToken = issueToken(user.email);
      const sessionParams = generateSessionParams(
        user,
        parseJwtToken(jwtToken)
      );
      const session = Session.create({ ...sessionParams }).then(() => {
        sendResponse({ jwtToken, error: null });
      });
    });
    userRegistrationRequest.catch(dbCreateError => {
      sendResponse({ error: { dbCreateError } });
    });
  } else {
    const requestParamsErrors = formatValidationsErrorsForClient(
      validationError
    );
    sendResponse({ error: requestParamsErrors });
  }
};

module.exports = {
  registerUser
};
