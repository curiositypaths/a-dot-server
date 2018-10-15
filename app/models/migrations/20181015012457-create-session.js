"use strict";

const { maxSessionTokenLength } = require("../../helpers/");

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
          type: Sequelize.INTEGER,
          allowNull: false
        },
        expiresAt: {
          type: Sequelize.INTEGER,
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
        paranoid: true,
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
