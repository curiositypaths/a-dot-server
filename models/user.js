module.exports = (sequelize, Sequelize) => {
  const minFirstAndLastNameLength = 2;
  const maxFirstAndLastNameLength = 50;
  const firstAndLastNameLengthValidationParams = [
    minFirstAndLastNameLength,
    maxFirstAndLastNameLength
  ];

  //Per bcrypt implementation, only the first 72 characters of a string are used. Any extra characters are ignored when matching passwords.
  const minPasswordLength = 8;
  const maxPasswordLength = 72;
  const passwordLengthValidationParams = [minPasswordLength, maxPasswordLength];

  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING(maxFirstAndLastNameLength),
        allowNull: false,
        validate: {
          notNull: true,
          len: firstAndLastNameLengthValidationParams
        }
      },
      lastName: {
        type: Sequelize.STRING(maxFirstAndLastNameLength),
        allowNull: false,
        validate: {
          notNull: true,
          len: firstAndLastNameLengthValidationParams
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING(maxPasswordLength),
        allowNull: false,
        unique: true,
        validate: {
          len: passwordLengthValidationParams
        }
      }
    },
    {
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["email"]
        }
      ]
    }
  );
  User.sync({ force: true });
  return User;
};