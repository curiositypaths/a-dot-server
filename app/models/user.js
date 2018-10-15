"use strict";
const bcrypt = require("bcrypt");
const {
  maxFirstAndLastNameLength,
  maxPasswordLength,
  passwordLengthValidationParams,
  firstAndLastNameLengthValidationParams,
  generateBcryptHash
} = require("../helpers");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      // id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true
      // },
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
  User.prototype.isValidPassword = function isValidPassword(clearTextPassword) {
    return bcrypt.compareSync(clearTextPassword, this.password);
  };
  return User;
};
