const Product = require("../models/product");
const Address = require("../models/address");
const Employee = require("../models/employee");
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
