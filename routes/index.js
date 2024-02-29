var express = require("express");
var router = express.Router();
const productRouter = require("./products");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json("express");
});

router.use("/products", productRouter);

module.exports = router;
