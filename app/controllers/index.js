const {
  validateParams,
  formatSchemaValidationErrors
} = require("../helpers/validators");

module.exports.createResource = (
  params,
  schema,
  model,
  successCb,
  errorCb,
  res
) => {
  const { validatedParams, validationError } = validateParams(params, schema);

  const createResource = () => {
    const createModelPromise = model.create(validatedParams);
    return createModelPromise.then(successCb, errorCb);
  };

  const sendInvalidParamsResponse = () => {
    res.json({ errors: formatSchemaValidationErrors(validationError) });
  };

  !validationError ? createResource() : sendInvalidParamsResponse();
};
