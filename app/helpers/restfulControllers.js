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
    res.json({ error: validationError });
  };

  !validationError ? createResource() : sendInvalidParamsResponse();
};
