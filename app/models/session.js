module.exports = (sequelize, Sequelize) => {
  const sessionTokenLength = 50;

  const Session = sequelize.define(
    "session",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sessionToken: {
        type: Sequelize.STRING(sessionTokenLength),
        allowNull: false,
        validate: {
          notNull: true,
          len: [sessionTokenLength, sessionTokenLength]
        }
      },
      issuedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true
        }
      },
      scheduledExpirationTime: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true
        }
      },
      lastTokenSubmissionTimestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isDate: true
        }
      }
    },
    {
      paranoid: true,
      indexes: [
        {
          unique: true,
          fields: ["sessionToken"]
        }
      ]
    }
  );
  Session.sync({ force: true });
  return Session;
};
