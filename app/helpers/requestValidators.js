const Joi = require("joi");

const {
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength,
  minPasswordLength,
  maxPasswordLength
} = require("../helpers");

const validatorOptions = {
  abortEarly: false,
  stripUnknown: true,
  presence: "required"
};

const formatValidationsErrorsForClient = ({ details: errorsDetails }) => {
  return errorsDetails.reduce((acc, cv) => {
    console.log("Acc is ", acc);
    console.log("CV is ", cv);
    if (acc[cv.path[0]]) {
      acc[cv.path[0]].push(cv.message);
    } else {
      acc[cv.path[0]] = [cv.message];
    }
    return acc;
  }, {});
};

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
  registerUserSchema,
  validatorOptions,
  formatValidationsErrorsForClient
};
