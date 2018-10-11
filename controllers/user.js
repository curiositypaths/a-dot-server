const { User } = require("../models/index");
const { processUserSignUp } = require("../services/userRegistration");

exports.create = (req, res) => {
  console.log("params are....", req.body);
  res.json({ message: "Coming soon" });
};
