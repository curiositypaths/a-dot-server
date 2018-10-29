const { note } = require("../../models");
const nanoIdCustomGenerator = require("nanoid/generate");
const { note: model, revision: revisionModel } = require("../../models");
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
    // Need to replace with errors details
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

const update = (req, res, next) => {
  const { update: schema } = require("./schemas");

  const successCb = revision => {
    res.statusCode = HTTP_STATUS_CODES.CREATED;
    res.json({ error: null, revision });
  };

  const errorCb = error => {
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errorDetails = [];
    // Need to replace with errors details
    res.json({ error: true, errorDetails: error });
  };

  const { body: params } = req;

  try {
    // Clear text passwords meets validation requirements. Attempt to persist user
    const { publicId } = params;
    note.findOne({ where: { publicId } }).then(note => {
      params.noteId = note.id;
      createResource(params, schema, revisionModel, successCb, errorCb, res);
    });
  } catch (error) {
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errorDetails = [];
    // Need to replace with errors details
    res.json({ error: true, errorDetails: error });
  }
};
module.exports = {
  create,
  update
};
