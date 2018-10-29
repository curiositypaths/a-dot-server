"use strict";
const {
  maxFirstAndLastNameLength,
  maxPasswordLength,
  passwordLengthValidationParams,
  firstAndLastNameLengthValidationParams
} = require("./validationParams");
const { generateBcryptHash, isPasswordValid } = require("./helpers");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING(maxFirstAndLastNameLength),
        allowNull: false,
        validate: {
          len: firstAndLastNameLengthValidationParams
        }
      },
      lastName: {
        type: DataTypes.STRING(maxFirstAndLastNameLength),
        allowNull: false,
        validate: {
          len: firstAndLastNameLengthValidationParams
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING(maxPasswordLength),
        allowNull: false,
        validate: {
          len: passwordLengthValidationParams
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    },
    {
      paranoid: true
    }
  );
  // associations setup
  User.associate = function({ user, session, note }) {
    user.hasMany(session, { as: "sessions" });
    user.hasMany(note, { as: "notes" });
  };
  // instance methods definitions
  User.prototype.isPasswordValid = isPasswordValid;
  return User;
};
