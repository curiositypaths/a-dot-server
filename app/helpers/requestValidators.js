const Joi = require("joi");

const {
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength,
  minPasswordLength,
  maxPasswordLength
} = require("../helpers");

// const validatorOptions = {
//   abortEarly: false,
//   stripUnknown: true,
//   presence: "required"
// };

const formatSchemaValidationErrors = ({ details: errorsDetails }) => {
  return errorsDetails.reduce((msg, validationError) => {
    const paramName = validationError.path[0];
    if (msg[paramName]) {
      msg[paramName].push(validationError.message);
    } else {
      msg[paramName] = [validationError.message];
    }
    return msg;
  }, {});
};

const createUserParamsSchema = Joi.object().keys({
  firstName: Joi.string()
    .alphanum()
    .min(minFirstAndLastNameLength)
    .max(maxFirstAndLastNameLength)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(minFirstAndLastNameLength)
    .max(maxFirstAndLastNameLength)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(minPasswordLength)
    .max(maxPasswordLength)
    .required(),
  email: Joi.string().email({ minDomainAtoms: 2 })
});

// const registerUserValidatorNameRequirement = Joi.string()
//   .alphanum()
//   .min(minFirstAndLastNameLength)
//   .max(maxFirstAndLastNameLength)
//   .required();

// const registerUserSchema = Joi.object().keys({
//   firstName: registerUserValidatorNameRequirement,
//   lastName: registerUserValidatorNameRequirement,
//   password: Joi.string()
//     .alphanum()
//     .min(minPasswordLength)
//     .max(maxPasswordLength)
//     .required(),
//   email: Joi.string().email({ minDomainAtoms: 2 })
// });

module.exports = {
  createUserParamsSchema,
  formatSchemaValidationErrors
};
