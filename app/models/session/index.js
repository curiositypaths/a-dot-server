"use strict";

const { maxSessionTokenLength } = require("./validationParams");

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "session",
    {
      sessionToken: {
        type: DataTypes.STRING(maxSessionTokenLength),
        allowNull: false
      },
      issuedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      paranoid: true
    }
  );
  Session.associate = function({ user, session }) {
    session.belongsTo(user);
  };
  return Session;
};
