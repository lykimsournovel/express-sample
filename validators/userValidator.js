const { check, body } = require("express-validator");
const User = require("../models/user");

const userValidator = [
  check("email")
    .isEmail()
    .not()
    .isEmpty()
    .custom(async (value) => {
      const findUser = await User.findOne({ where: { email: value } });
      if (findUser) {
        throw new Error("User already exists");
      }
      return true;
    }),
  check("password").isString().not().isEmpty(),
  check("confirmPassword").custom(async (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  check("role").isString().not().isEmpty(),
];

module.exports = userValidator;
