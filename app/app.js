const express = require("express");
const cors = require("cors");
const { apiRouterPrefix, apiRouter } = require("./routes/api");

const app = express();

app.use(apiRouterPrefix, apiRouter);

module.exports = app;
