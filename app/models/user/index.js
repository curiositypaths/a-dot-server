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
    "User",
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
        },
        set(clearTextPassword) {
          this.setDataValue("password", generateBcryptHash(clearTextPassword));
        }
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    },
    {}
  );
  // associations setup
  User.associate = function({ User, Session }) {
    User.hasMany(Session, { as: "Sessions" });
  };
  // instance methods definitions
  User.prototype.isPasswordValid = isPasswordValid;
  return User;
};
