const express = require("express");
const middleware = express();

middleware.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, authorization");
  next();
});

module.exports = middleware;
