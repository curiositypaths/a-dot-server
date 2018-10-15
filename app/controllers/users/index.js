const { User: model } = require("../../models");
const { createResource } = require("../../helpers/restfulControllers");

const create = ({ body: params }, res, next) => {
  const { create: schema } = require("./schemas");
  const successCb = user => {
    res.json({ user });
  };
  const errorCb = () => {
    console.log("errorCb will be invoked");
  };
  createResource(params, schema, model, successCb, errorCb, res);
};

module.exports = {
  create
};
