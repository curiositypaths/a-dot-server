const { User } = require("../models/index");
const processUserSignUp = require("../services/userRegistration");

console.log(processUserSignUp);

exports.create = (req, res) => {
  console.log("The request body contains: ----------> ", req.body);
  processUserSignUp(req.body);
  res.json({ message: "Coming soon" });
};
