const Joi = require("joi");

const {
  minPasswordLength,
  maxPasswordLength
} = require("../../models/user/validationParams");

module.exports.create = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string()
    .alphanum()
    .min(minPasswordLength)
    .max(maxPasswordLength)
    .required()
});
