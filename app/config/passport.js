const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { authenticateUser } = require("../helpers/passport");

const mountLoginMiddleware = () => {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      authenticateUser
    )
  );
};

module.exports = {
  mountLoginMiddleware
};
