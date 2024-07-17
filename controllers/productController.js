const Product = require("../models/product");
const Address = require("../models/address");
const Employee = require("../models/employee");
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);
exports.getProduct = async (req, res) => {
  try {
    const findAll = await Product.findAll();
    res.status(201).json(findAll);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findProduct = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const findProduct = await Product.findByPk(id);
  res.status(201).json(findProduct);
};

exports.getAllPorduct = async (req, res) => {
  const findAll = await Product.findAll();
  res.status(201).json(findAll);
};

exports.savePorduct = (req, res) => {
  const { title, price, description } = req.body;
  Product.create({
    title,
    price,
    description,
  });
  res.status(201).json("save success");
};

exports.checkoutProduct = async (req, res) => {
  try {
    console.log("hi");
    console.log(req.body);
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    console.log(paymentIntent);
    return res.status(200).json({
      paymentIntent,
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};
