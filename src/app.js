const express = require("express");
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
const passport = require("passport");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ message: "In bocca al lupo!" }));

app.post(
  "/",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user
    });
  }
);

export default app;
