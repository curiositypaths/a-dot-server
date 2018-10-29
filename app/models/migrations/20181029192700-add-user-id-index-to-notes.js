"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex("notes", ["userId"], {
      indexName: "notes_userId"
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex("notes", "notes_userId");
  }
};
