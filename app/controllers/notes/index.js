const { note } = require("../../models");
const nanoIdCustomGenerator = require("nanoid/generate");
const { note: noteModel, revision: revisionModel } = require("../../models");
const {
  publicIdAlphabet,
  publicIdTokenLength
} = require("../../models/note/validationParams");
const { createResource } = require("../");
const HTTP_STATUS_CODES = require("../../helpers/httpStatusCodes");
const schemas = require("./schemas");
const { create: createJSONView } = require("../../views/notes");

const create = (req, res, next) => {
  const schema = schemas.create;

  const successCb = note => {
    req.body.publicId = note.publicId;
    update(req, res, next);
  };

  const errorCb = error => {
    // Review for error handling logic and consider adding a hook
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errorDetails = [];
    // Need to replace with errors details
    res.json({ error: true, errorDetails: errorDetails });
  };

  const { body: params } = req;
  const { user: userAssociatedToTheRequest } = req;
  params.userId = userAssociatedToTheRequest.id;
  const { body: noteBody } = params;

  // https://github.com/ai/nanoid#custom-alphabet-or-length
  params.publicId = nanoIdCustomGenerator(
    publicIdAlphabet,
    publicIdTokenLength
  );

  createResource(params, schema, noteModel, successCb, errorCb, res);
};
module.exports = {
  create
};

const update = (req, res, next) => {
  const schema = schemas.update;

  const successCb = revision => {
    res.statusCode = HTTP_STATUS_CODES.CREATED;
    res.json({ error: null, revision });
  };

  const errorCb = error => {
    // Review for error handling logic and consider adding a hook
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errorDetails = [];
    // Need to replace with errors details
    res.json({ error: true, errorDetails: errorDetails });
  };

  try {
    const { body: params } = req;
    const { publicId } = params;

    if (req.note) {
      params.noteId = req.note.id;
      createResource(params, schema, revisionModel, successCb, errorCb, res);
    }

    note.findOne({ where: { publicId } }).then(note => {
      // required to associated the new revision (new note body) to the note
      params.noteId = note.id;
      createResource(params, schema, revisionModel, successCb, errorCb, res);
    });
  } catch (error) {
    // Review for error handling logic and consider adding a hook
    res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    let errorDetails = [];
    // Need to replace with errors details
    res.send();
  }
};

const read = (req, res, next) => {
  const read = schemas.read;

  const successCb = note => {
    res.statusCode = HTTP_STATUS_CODES.CREATED;
    res.json({ error: null, note });
  };

  const errorCb = error => {
    // Review for error handling logic and consider adding a hook
    res.statusCode = HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY;
    let errorDetails = [];
    // Need to replace with errors details
    res.json({ error: true, errorDetails: errorDetails });
  };

  try {
    const { publicId } = req.params;
    note
      .findOne({
        where: { publicId },
        include: [
          {
            model: revisionModel,
            as: "revisions",
            limit: 1,
            order: [["createdAt", "DESC"]]
          }
        ]
      })
      .then(note => {
        const viewData = { note };
        if (note) {
          res.json(createJSONView(viewData));
        }
      });
  } catch (error) {
    // Review for error handling logic and consider adding a hook
    res.statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    let errorDetails = [];
    // Need to replace with errors details
    res.json({ error: true, errorDetails: errorDetails });
  }
};

module.exports = {
  create,
  update,
  read
};
