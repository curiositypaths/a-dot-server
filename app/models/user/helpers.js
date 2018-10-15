const bcrypt = require("bcrypt");

module.exports.generateBcryptHash = clearTextPassword => {
  const bcryptSaltRounds = 10;
  // synchronous hash generation
  return bcrypt.hashSync(clearTextPassword, bcryptSaltRounds);
};

module.exports.isValidPassword = function isValidPassword(clearTextPassword) {
  return bcrypt.compareSync(clearTextPassword, this.password);
};
