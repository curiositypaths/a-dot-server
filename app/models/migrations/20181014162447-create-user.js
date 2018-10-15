"use strict";

const {
  maxFirstAndLastNameLength,
  maxPasswordLength
} = require("../user/validationParams");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING(maxFirstAndLastNameLength),
          allowNull: false
        },
        lastName: {
          type: Sequelize.STRING(maxFirstAndLastNameLength),
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING(maxPasswordLength),
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      },
      {
        paranoid: true,
        indexes: [
          {
            unique: true,
            fields: ["email"]
          }
        ]
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
