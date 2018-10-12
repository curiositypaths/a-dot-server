const { User } = require("../models");

const registerUser = async (req, res, next) => {
  console.log("-----------------");
  try {
    const user = await User.create(req.body);
    console.log("User....", user);
    if (user) {
      return res.json({ user: JSON.stringify(user) });
    }
  } catch (error) {
    return res.json({ message: JSON.stringify(error) });
  }
};

module.exports = {
  registerUser
};
