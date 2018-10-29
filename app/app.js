const express = require("express");
const { apiRouterPrefix } = require("./routes/routePrefixes");
const { apiRouter } = require("./routes/api");

const app = express();

app.use(apiRouterPrefix, apiRouter);

module.exports = app;
