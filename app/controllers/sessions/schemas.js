const Joi = require("joi");
const {
  maxSessionTokenLength
} = require("../../models/session/validationParams");

const {
  minPasswordLength,
  maxPasswordLength
} = require("../../models/user/validationParams");

const authenticate = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }),
  password: Joi.string()
    .alphanum()
    .min(minPasswordLength)
    .max(maxPasswordLength)
    .required()
});

const create = Joi.object().keys({
  userId: Joi.number()
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

module.exports = {
  authenticate,
  create
};
