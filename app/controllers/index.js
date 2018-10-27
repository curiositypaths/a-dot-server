const {
  validateParams,
  formatSchemaValidationErrors
} = require("../helpers/validators");

const { CREATED, UNPROCESSABLE_ENTITY } = require("../helpers/httpStatusCodes");

const createResource = (params, schema, model, successCb, errorCb, res) => {
  const { validatedParams, validationError } = validateParams(params, schema);

  const createResource = () => {
    const createModelPromise = model.create(validatedParams);
    return createModelPromise.then(successCb, errorCb);
  };

  const sendInvalidParamsResponse = () => {
    res.statusCode = UNPROCESSABLE_ENTITY;
    res.json({ errors: formatSchemaValidationErrors(validationError) });
  };

  !validationError ? createResource() : sendInvalidParamsResponse();
};

module.exports = {
  createResource
};
