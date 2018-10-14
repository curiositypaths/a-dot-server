const fs = require("fs");

// Misc helpers
const syncReqBodyLogger = (req, res, next) => {
  console.log("The request body is, ", req.body);
  next();
};

// ORM related helpers
const generateDBConfiguration = () => ({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_ORM_DIALECT
});

const collectSequelizeModelsFilenames = (directoryName, basename) =>
  fs.readdirSync(directoryName).filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  });

const capitalizeModelName = modelName =>
  modelName.charAt(0).toUpperCase() + modelName.slice(1);

module.exports = {
  collectSequelizeModelsFilenames,
  capitalizeModelName,
  syncReqBodyLogger,
  generateDBConfiguration
};
