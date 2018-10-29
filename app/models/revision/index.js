"use strict";
module.exports = (sequelize, DataTypes) => {
  const revision = sequelize.define(
    "revision",
    {
      body: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      noteId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  revision.associate = function({ note, revision }) {
    revision.belongsTo(note);
  };
  return revision;
};
