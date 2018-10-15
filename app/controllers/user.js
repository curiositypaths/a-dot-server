const Joi = require("joi");
const { issueToken, parseJwtToken } = require("../helpers/jwt");
const { User, Session } = require("../models");
const {
  createUserParamsSchema,
  formatSchemaValidationErrors
} = require("../helpers/requestValidators");
const { generateSessionParams } = require("../helpers");
const { createResource } = require("../helpers/restfulControllers");

const successCb = resource => {
  console.log("OK....................!");
};

const errorCb = resource => {
  console.log("No OK....................!");
};

const registerUser = (req, res, next) => {
  createResource(
    req.body,
    createUserParamsSchema,
    User,
    successCb,
    errorCb,
    res
  );
};

// const registerUser = (req, res, next) => {
//   const { error: validationError, value: validatedBody } = Joi.validate(
//     req.body,
//     registerUserSchema,
//     validatorOptions
//   );

//   const sendResponse = response => res.json(response);

//   if (!validationError) {
//     const userRegistrationRequest = User.create(validatedBody);
//     userRegistrationRequest.then(user => {
//       const jwtToken = issueToken(user.email);
//       const sessionParams = generateSessionParams(
//         user,
//         parseJwtToken(jwtToken)
//       );
//       const session = Session.create({ ...sessionParams }).then(() => {
//         sendResponse({ jwtToken, error: null });
//       });
//     });
//     userRegistrationRequest.catch(dbCreateError => {
//       sendResponse({ error: { dbCreateError } });
//     });
//   } else {
//     const requestParamsErrors = formatValidationsErrorsForClient(
//       validationError
//     );
//     sendResponse({ error: requestParamsErrors });
//   }
// };

module.exports = {
  registerUser
};
