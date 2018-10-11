const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User } = require("../models/");

const localStrategyKeysMapping = {
  usernameField: "email",
  passwordField: "password"
};

// const processUserSignUp = ({ firstName, lastName, email, password }) => {
//   passport.use(
//     "signup",
//     new localStrategy(
//       localStrategyKeysMapping,
//       async (email, password, done) => {
//         try {
//           //Save the information provided by the user to the the database
//           const user = await User.create({
//             firstName,
//             lastName,
//             email,
//             password
//           });
//           //Send the user information to the next middleware
//           return done(null, user);
//         } catch (error) {
//           done(error);
//         }
//       }
//     )
//   );
// };

const processUserSignUp = ({ firstName, lastName, email, password }) => {
  passport.use(
    "signup",
    new localStrategy(
      localStrategyKeysMapping,
      async (email, password, done) => {
        try {
          //Save the information provided by the user to the the database
          const user = await User.create({
            firstName,
            lastName,
            email,
            password
          });
          //Send the user information to the next middleware
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

exports.processUserSignUp = processUserSignUp;
