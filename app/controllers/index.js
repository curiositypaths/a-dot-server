const {
  validateParams,
  formatSchemaValidationErrors
} = require("../helpers/validators");

const HTTP_STATUS_CODES = require("../helpers/httpStatusCodes");

const createResource = (params, schema, model, successCb, errorCb, res) => {
  const { validatedParams, validationError } = validateParams(params, schema);

  const createResource = () => {
    const createModelPromise = model.create(validatedParams);
    return createModelPromise.then(successCb, errorCb);
  };

  const sendInvalidParamsResponse = () => {
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    res.json({ errors: formatSchemaValidationErrors(validationError) });
  };

  !validationError ? createResource() : sendInvalidParamsResponse();
};

module.exports = {
  createResource
};
