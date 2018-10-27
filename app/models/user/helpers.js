const bcrypt = require("bcrypt");

module.exports.asyncGenerateBcryptHash = (clearTextPassword, cb) => {
  const bcryptSaltRounds = 10;
  // synchronous hash generation
  return bcrypt.hash(clearTextPassword, bcryptSaltRounds, cb);
};

module.exports.isPasswordValid = function isPasswordValid(clearTextPassword) {
  return bcrypt.compare(clearTextPassword, this.password);
};
