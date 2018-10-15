const Joi = require("joi");

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
  formatSchemaValidationErrors
};
