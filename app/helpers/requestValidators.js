const Joi = require("joi");

const {
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength,
  minPasswordLength,
  maxPasswordLength
} = require("../helpers");

const registerUserValidatorNameRequirement = Joi.string()
  .alphanum()
  .min(minFirstAndLastNameLength)
  .max(maxFirstAndLastNameLength)
  .required();

const registerUserSchema = Joi.object().keys({
  firstName: registerUserValidatorNameRequirement,
  lastName: registerUserValidatorNameRequirement,
  password: Joi.string()
    .alphanum()
    .min(minPasswordLength)
    .max(maxPasswordLength)
    .required(),
  email: Joi.string().email({ minDomainAtoms: 2 })
});

module.exports = {
  registerUserSchema
};
