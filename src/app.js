const express = require("express");
const api = require("./api");

const app = express();

app.use(function(req, res, next) {
  console.log("Req is :", req);
  next();
});

//app.use("/api/v1", api);

module.export = app;
