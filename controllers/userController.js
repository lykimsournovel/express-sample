const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;

const testCallback = (callback) => {
  const data = {
    id: 1,
    name: "kimsour",
  };

  return callback(data);
};

const generateToken = (user, expire) => {
  testCallback((data) => {
    console.log(data);
  });
  const userInfo = { email: user.email, id: user.id, roles: user.role };
  const token = jwt.sign(userInfo, process.env.TOKEN_SECRET, {
    expiresIn: expire,
  });
  const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "365d",
  });

  // const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
  //   expiresIn: "2m",
  // });
  const authToken = { token: token, refreshToken: refreshToken };
  return authToken;
};

exports.register = async (req, res) => {
  const validatorError = validationResult(req);
  const { password, email, role } = req.body;
  if (!validatorError.isEmpty()) {
    return res.status(422).json({
      message: validatorError.array(),
      oldInput: {
        data: req.body,
      },
    });
  }
  try {
    const salt = await bcrypt.genSalt(saltRound);
    const hushPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email: email,
      password: hushPassword,
      role: role,
    });
    const authToken = generateToken(user, "1m");
    return res
      .status(200)
      .json({ message: "Success", user: user, authToken: authToken });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const authToken = generateToken(user, "1m");
    return res.status(200).json({ message: "Success", authToken: authToken });
  } catch (error) {
    return res
      .status(401)
      .json({ error: error, message: "refresh_token_expired" });
  }

  // return token;

  // console.log(token);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const validatorError = validationResult(req);
  if (!validatorError.isEmpty()) {
    return res.status(422).json({
      message: validatorError.array(),
      oldInput: {
        data: req.body,
      },
    });
  }
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const authToken = generateToken(user, "1m");
        return res.status(200).json({
          message: "Success",
          user: {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          authToken: authToken,
        });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
