const passport = require("passport");
const { Session: model } = require("../../models");
const { createResource } = require("../../helpers/restfulControllers");
const { issueToken } = require("../../helpers/jwt");
const { generateSessionParams } = require("./helpers");

const create = (req, res, next) => {
  const { create: schema } = require("./schemas");
  const successCb = session => {
    res.json({ session });
  };
  const errorCb = error => {
    res.json({ error });
  };

  passport.authenticate(
    "local",
    { failureRedirect: "/login" },
    (error, user, message) => {
      const jwtTokenWrapper = issueToken(req.body);
      const params = generateSessionParams(user, jwtTokenWrapper);
      console.log("Params are ------>", params);
      createResource(params, schema, model, successCb, errorCb, res);
    }
  )(req, res, next);
};

module.exports = {
  create
};
