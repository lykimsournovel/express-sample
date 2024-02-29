const User = require("../models/user");
const { validationResult } = require("express-validator");
exports.register = async (req, res) => {
  const validatorError = validationResult(req);
  if (!validatorError.isEmpty()) {
    return res.status(422).json({
      message: validatorError.array(),
      oldInput: {
        data: req.body,
      },
    });
  }
  const user = await User.create(req.body);
  return res.status(200).json({ message: "Success", user: user });
};
