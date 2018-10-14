const passport = require("passport");

const createSession = (req, res, next) => {
  passport.authenticate(
    "local",
    { failureRedirect: "/login" },
    (error, user, message) => {
      res.json({ message });
    }
  )(req, res, next);
};

module.exports = {
  createSession
};
