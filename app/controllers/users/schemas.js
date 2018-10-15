const Joi = require("joi");

const {
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength,
  minPasswordLength,
  maxPasswordLength
} = require("../../models/user/validationParams");

module.exports.create = Joi.object().keys({
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
