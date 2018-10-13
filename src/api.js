const express = require("express");
const bodyParser = require("body-parser");
const { registerUser } = require("../controllers/user");
const { syncReqBodyLogger } = require("../helpers/middleware");
const passport = require("passport");
//require("../config/auth");

//const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const api = express.Router();

api.use(bodyParser.json());
api.use(syncReqBodyLogger);
api.use(passport.initialize());

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      //throw "Doing auth";
      try {
        //Find the user associated with the email provided by the user
        const user = await User.findOne({ email });
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: "User not found" });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }
        //Send the user information to the next middleware
        throw "Valid password";
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

api.post("/sessions", registerUser);
api.post(
  "/sessions",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/");
  }
);

module.exports = api;
