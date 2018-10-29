"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex("revisions", ["noteId"], {
      indexName: "revisions_noteId"
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex("revisions", "revisions_noteId");
  }
};
