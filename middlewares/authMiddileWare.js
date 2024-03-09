const express = require("express");
const middleware = express();
const jwt = require("jsonwebtoken");

middleware.use(async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const user = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = middleware;
