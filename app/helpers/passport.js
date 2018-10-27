const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");

const authenticateUser = async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    if (!(await user.isValidPassword(password))) {
      return done(null, false, { message: "Wrong Password" });
    }
    return done(null, user, { message: "Logged in Successfully" });
  } catch (error) {
    return done(error);
  }
};

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
