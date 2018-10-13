const { User } = require("../models");

const registerUser = (req, res, next) => {
  const userRegistrationRequest = User.create(req.body);
  userRegistrationRequest.then(user => {
    next();
  });

  userRegistrationRequest.catch(error => {
    res.json({ error });
  });
};

module.exports = {
  registerUser
};
