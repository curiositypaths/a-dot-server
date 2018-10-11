const express = require("express");
const userController = require("../controllers/user");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ message: "In bocca al lupo!" }));

app.post("/", userController.create);

export default app;
