const express = require("express");
const authMiddleware = express();
const jwt = require("jsonwebtoken");

authMiddleware.use(async (req, res, next) => {
  try {
    console.log("sdsds");
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    const user = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = authMiddleware;
