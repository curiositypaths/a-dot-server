const Joi = require("joi");
const {
  maxSessionTokenLength
} = require("../../models/session/validationParams");

const {
  minPasswordLength,
  maxPasswordLength
} = require("../../models/user/validationParams");

module.exports.authenticate = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string()
    .alphanum()
    .min(minPasswordLength)
    .max(maxPasswordLength)
    .required()
});

module.exports.create = Joi.object().keys({
  UserId: Joi.number()
    .integer()
    .required(),
  sessionToken: Joi.string()
    .min(maxSessionTokenLength)
    .max(maxSessionTokenLength)
    .required(),
  issuedAt: Joi.date()
    .timestamp()
    .required(),
  expiresAt: Joi.date()
    .timestamp()
    .required()
});
