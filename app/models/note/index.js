"use strict";

const { publicIdTokenLength } = require("./validationParams");

module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "note",
    {
      publicId: {
        type: DataTypes.STRING(publicIdTokenLength),
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE
    },
    {}
  );
  Note.associate = function({ user, note }) {
    note.belongsTo(user);
  };
  return Note;
};
