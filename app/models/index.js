"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const dbConfigs = require("../config/db");
const { DEVELOPMENT } = require("../helpers");
const {
  collectSequelizeModelsFilenames,
  capitalizeModelName
} = require("../helpers");

console.log(
  "Model files are ",
  collectSequelizeModelsFilenames(__dirname, basename)
);

const appEnvironment = process.env.ENVIRONMENT
  ? process.env.ENVIRONMENT
  : DEVELOPMENT;
const config = dbConfigs[appEnvironment];

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
