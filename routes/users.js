var express = require("express");
var router = express.Router();
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../validators/userValidator");
const UserController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", userRegisterValidator, UserController.register);
router.post("/login", userLoginValidator, UserController.login);

module.exports = router;
