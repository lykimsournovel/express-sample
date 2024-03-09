const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProduct);
router.post("/save", productController.savePorduct);
router.get("/find/:id", productController.findProduct);
router.get("/checkout", productController.checkoutProduct);
module.exports = router;
