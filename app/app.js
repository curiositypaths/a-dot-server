const express = require("express");
const api = require("./routes/api");

const app = express();
app.use("/api/v1", api);

module.exports = app;
