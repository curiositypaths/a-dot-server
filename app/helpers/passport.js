const { user } = require("../models");

const authenticateUser = async (email, password, done) => {
  let userInstance;
  let validPassword = false;

  const findUser = email => user.findOne({ where: { email } });

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
    validPassword = passwordIsValid;
    // Check if user exist (userInstance) since a "User not found" would
    // have been handled by the returnUserNotFound fn
    if (!passwordIsValid && userInstance) {
      done(true, false, { message: "Wrong Password" });
    }
  };

  const returnPositiveAuthentication = () => {
    if (userInstance && validPassword) {
      done(null, userInstance, { message: "Logged in Successfully" });
    }
  };

  findUser(email)
    .then(verifyUserExist)
    .then(ifUserExistVerifyPassword, returnUserNotFound)
    .then(verifyPasswordComparison)
    .then(returnPositiveAuthentication);
};

export { authenticateUser };
