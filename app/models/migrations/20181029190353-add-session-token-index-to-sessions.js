"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex("sessions", ["sessionToken"], {
      indexName: "sessions_sessionToken",
      indicesType: "UNIQUE"
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex("sessions", "sessions_sessionToken");
  }
};
