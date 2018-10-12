const express = require("express");
const api = require("./api");
const bodyParser = require("body-parser");

const app = express();

app.use("/api/v1/*", api);

module.exports = app;
