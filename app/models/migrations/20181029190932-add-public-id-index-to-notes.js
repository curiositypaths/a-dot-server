"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex("notes", ["publicId"], {
      indexName: "notes_publicId"
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex("notes", "notes_publicId");
  }
};
