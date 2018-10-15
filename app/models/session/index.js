"use strict";

const { maxSessionTokenLength } = require("./validationParams");

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    sessionToken: {
      type: DataTypes.STRING(maxSessionTokenLength),
      allowNull: false
    },
    issuedAt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Session.associate = function({ User, Session }) {
    Session.belongsTo(User);
  };
  return Session;
};