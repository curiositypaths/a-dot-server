"use strict";

const Sequelize = require("sequelize");
const dbConfigs = require("../config/db");
const { DEVELOPMENT } = require("../config");

const appEnvironment = process.env.ENVIRONMENT
  ? process.env.ENVIRONMENT
  : DEVELOPMENT;
const config = dbConfigs[appEnvironment];

// Add models to be loaded here. The value in the array must match the name of the model parent directory.
// The model core logic should be in an index.js file
const modelsToLoad = ["user", "session"];

const db = {};
const sequelize = new Sequelize(config);

// const capitalizeModelName = modelName =>
//   modelName.charAt(0).toUpperCase() + modelName.slice(1);

const requireSequelizeModel = sequelizeModelName =>
  require(`./${sequelizeModelName}/`);

const instantiateSequelizeModel = module => {
  const model = module(sequelize, Sequelize, config);
  db[model.name] = model;
};

const loadModules = () => {
  modelsToLoad.map(requireSequelizeModel).forEach(instantiateSequelizeModel);
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

loadModules();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
