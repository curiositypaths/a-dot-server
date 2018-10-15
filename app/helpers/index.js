const fs = require("fs");
const bcrypt = require("bcrypt");

// Misc helpers
const syncReqBodyLogger = (req, res, next) => {
  console.log("The request body is, ", req.body);
  next();
};

const DEVELOPMENT = "development";

// ORM related helpers
const minFirstAndLastNameLength = 2;
const maxFirstAndLastNameLength = 50;
const firstAndLastNameLengthValidationParams = [
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength
];

// Per bcrypt implementation, only the first 72 characters of a string are used. Any extra characters are ignored when matching passwords.
const minPasswordLength = 8;
const maxPasswordLength = 72;
const passwordLengthValidationParams = [minPasswordLength, maxPasswordLength];

const generateBcryptHash = clearTextPassword => {
  const bcryptSaltRounds = 10;
  // synchronous hash generation
  return bcrypt.hashSync(clearTextPassword, bcryptSaltRounds);
};

const maxSessionTokenLength = 21;

const generateSessionParams = (
  { id: UserId },
  { sessionToken, iat: issuedAt, exp: expiresAt }
) => ({
  UserId,
  sessionToken,
  issuedAt,
  expiresAt
});

const collectSequelizeModelsFilenames = (directoryName, basename) =>
  fs
    .readdirSync(directoryName)
    .filter(
      file =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );

const capitalizeModelName = modelName =>
  modelName.charAt(0).toUpperCase() + modelName.slice(1);

module.exports = {
  collectSequelizeModelsFilenames,
  capitalizeModelName,
  syncReqBodyLogger,
  DEVELOPMENT,
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength,
  minPasswordLength,
  maxPasswordLength,
  passwordLengthValidationParams,
  firstAndLastNameLengthValidationParams,
  generateBcryptHash,
  maxSessionTokenLength,
  generateSessionParams
};
