const { User: model } = require("../../models");
const { createResource } = require("../../helpers/restfulControllers");
const {
  CREATED,
  UNPROCESSABLE_ENTITY
} = require("../../helpers/httpStatusCodes");

const create = ({ body: params }, res, next) => {
  const { create: schema } = require("./schemas");
  const successCb = ({ firstName, lastName, email }) => {
    res.statusCode = CREATED;
    res.json({ firstName, lastName, emaily });
  };
  const errorCb = error => {
    res.statusCode = UNPROCESSABLE_ENTITY;
    res.json({ error });
  };
  createResource(params, schema, model, successCb, errorCb, res);
};

module.exports = {
  create
};
