"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/dbConfig");
const {
  collectSequelizeModelsFilenames,
  capitalizeModelName
} = require("../helpers/db");

const db = {};
const sequelize = new Sequelize(config);

const requireSequelizeModel = sequelizeModelFileName =>
  require(`./${sequelizeModelFileName}`);

const instantiateSequelizeModel = module => {
  const model = module(sequelize, Sequelize, config);
  db[capitalizeModelName(model.name)] = model;
};

collectSequelizeModelsFilenames(__dirname, basename)
  .map(requireSequelizeModel)
  .forEach(instantiateSequelizeModel);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
