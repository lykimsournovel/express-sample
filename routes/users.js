var express = require("express");
var router = express.Router();
const userValidator = require("../validators/userValidator");
const UserController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", userValidator, UserController.register);

module.exports = router;
