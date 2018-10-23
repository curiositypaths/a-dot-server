const Joi = require("joi");

const validateParams = (params, schema) => {
  const schemaValidationOptions = {
    abortEarly: false,
    stripUnknown: true,
    presence: "required"
  };
  const { error: validationError, value: validatedParams } = Joi.validate(
    params,
    schema,
    schemaValidationOptions
  );
  return {
    validatedParams,
    validationError
  };
};

// The two helper methods below are are used to transform validations errors
// from: "\"firstName\" length must be at least 2 characters long"
// to:   "length must be at least 2 characters long"
// this should allow a simpler recycling of the error messages.
// firstName does not mean anything to the user
const findValuesBetweenDoubleQuotes = new RegExp(/(["])(\\?.)*?\1/);
const cleanMessage = msg =>
  msg.replace(findValuesBetweenDoubleQuotes, "").trim();

const formatSchemaValidationErrors = ({ details: errorsDetails }) => {
  return errorsDetails.reduce((msg, validationError) => {
    const paramName = validationError.path[0];
    if (msg[paramName]) {
      msg[paramName].push(cleanMessage(validationError.message));
    } else {
      msg[paramName] = [cleanMessage(validationError.message)];
    }
    return msg;
  }, {});
};

module.exports = {
  validateParams,
  formatSchemaValidationErrors
};
