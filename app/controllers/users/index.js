const { User: model } = require("../../models");
const { createResource } = require("../");
const {
  CREATED,
  UNPROCESSABLE_ENTITY
} = require("../../helpers/httpStatusCodes");

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");
  const successCb = user => {
    res.statusCode = CREATED;
    req.verifyLoginCredentialsOutput = { error: null, user, message: null };
    next();
  };
  const errorCb = error => {
    res.statusCode = UNPROCESSABLE_ENTITY;
    const {
      body: { email: duplicateEmailAddress }
    } = req;
    const errors = {
      account: { accountAlreadyExist: true, duplicateEmailAddress }
    };
    res.json({ errors });
  };
  const { body: params } = req;
  createResource(params, schema, model, successCb, errorCb, res);
};

module.exports = {
  create
};
