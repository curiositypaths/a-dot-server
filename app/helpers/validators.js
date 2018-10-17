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

module.exports = {
  validateParams,
  formatSchemaValidationErrors
};
