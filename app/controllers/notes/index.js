const { note } = require("../../models");
const nanoIdCustomGenerator = require("nanoid/generate");
const { note: model } = require("../../models");
const {
  publicIdAlphabet,
  publicIdTokenLength
} = require("../../models/note/validationParams");
const { createResource } = require("../");
const HTTP_STATUS_CODES = require("../../helpers/httpStatusCodes");

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");

  const successCb = note => {
    res.statusCode = HTTP_STATUS_CODES.CREATED;
    res.json({ error: null, note });
  };

  const errorCb = error => {
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errorDetails = [];
    res.json({ error: true, errorDetails: error });
  };

  const { body: params } = req;
  params.userId = req.user.id;

  // https://github.com/ai/nanoid#custom-alphabet-or-length
  params.publicId = nanoIdCustomGenerator(
    publicIdAlphabet,
    publicIdTokenLength
  );

  createResource(params, schema, model, successCb, errorCb, res);
};
module.exports = {
  create
};
