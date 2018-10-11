const fs = require("fs");

const collectSequelizeModelsFilenames = (directoryName, basename) =>
  fs.readdirSync(directoryName).filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  });

module.exports = {
  collectSequelizeModelsFilenames
};
