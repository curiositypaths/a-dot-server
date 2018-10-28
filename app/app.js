const express = require("express");
const cors = require("cors");
const { apiRouterPrefix, apiRouter } = require("./routes/api");

const app = express();

const corsOptions = {
  origin: process.env.WEB_CLIENT_ADDRESS,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  "Access-Control-Max-Age": 600,
  optionsSuccessStatus: 200 // some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(apiRouterPrefix, apiRouter);

module.exports = app;
