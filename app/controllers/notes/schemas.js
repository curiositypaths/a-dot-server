const Joi = require("joi");
const {
  publicIdTokenLength,
  maxTitleLength
} = require("../../models/note/validationParams");

const create = Joi.object().keys({
  userId: Joi.number()
    .integer()
    .required(),
  publicId: Joi.string()
    .min(publicIdTokenLength)
    .max(publicIdTokenLength)
    .required(),
  title: Joi.string()
    .min(0)
    .max(maxTitleLength)
});

module.exports = {
  create
};
