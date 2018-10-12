const { User } = require("../models");

const registerUser = async (req, res, next) => {
  console.log("-----------------");
  try {
    const user = await User.create(req.body);
    console.log("User....", user);
    if (user) {
      return res.json({ user: "YES" });
    }
  } catch (error) {
    return res.json({ message: "NO" });
  }
};

module.exports = {
  registerUser
};
