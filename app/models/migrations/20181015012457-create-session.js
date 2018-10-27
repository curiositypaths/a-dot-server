"use strict";

const { maxSessionTokenLength } = require("../session/validationParams");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Sessions",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        sessionToken: {
          type: Sequelize.STRING(maxSessionTokenLength),
          allowNull: false
        },
        issuedAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        expiresAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        indexes: [
          {
            unique: true,
            fields: ["sessionToken"]
          }
        ]
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Sessions");
  }
};
