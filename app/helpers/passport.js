const { User } = require("../models");

const authenticateUser = async (email, password, done) => {
  let userInstance;

  const findUser = email => User.findOne({ where: { email } });

  const verifyUserExist = user => {
    if (!user) {
      throw "User not found";
    }
    userInstance = user;
  };

  const returnUserNotFound = () => {
    done(true, false, { message: "User not found" });
    // Mock invalid password to support the rest of the promise chain
    return false;
  };

  const ifUserExistVerifyPassword = () =>
    userInstance.isPasswordValid(password);

  const verifyPasswordComparison = passwordIsValid => {
    if (!passwordIsValid && userInstance) {
      done(true, false, { message: "Wrong Password" });
      throw "Password is not valid";
    }
  };

  const returnPositiveAuthentication = () =>
    done(null, userInstance, { message: "Logged in Successfully" });

  findUser(email)
    .then(verifyUserExist)
    .then(ifUserExistVerifyPassword, returnUserNotFound)
    .then(verifyPasswordComparison)
    .then(returnPositiveAuthentication);
};

export { authenticateUser };
