const express = require("express");
const api = require("./api");

const app = express();
app.use("/api/v1", api);

module.exports = app;
