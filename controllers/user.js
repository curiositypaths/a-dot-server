const { User } = require("../models");

const registerUser = (req, res, next) => {
  return User.create(req.body);
};

module.exports = {
  registerUser
};
