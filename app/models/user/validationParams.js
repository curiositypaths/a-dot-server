// First and last name validations params
const minFirstAndLastNameLength = 2;
const maxFirstAndLastNameLength = 50;
const firstAndLastNameLengthValidationParams = [
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength
];

// Password validation params
// Per bcrypt implementation, only the first 72 characters of a string are used. Any extra characters are ignored when matching passwords.
const minPasswordLength = 8;
const maxPasswordLength = 72;
const passwordLengthValidationParams = [minPasswordLength, maxPasswordLength];

// Exports
module.exports = {
  minFirstAndLastNameLength,
  maxFirstAndLastNameLength,
  firstAndLastNameLengthValidationParams,
  minPasswordLength,
  maxPasswordLength,
  passwordLengthValidationParams
};
