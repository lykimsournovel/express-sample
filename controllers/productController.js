const Product = require("../models/product");
const Address = require("../models/address");
const Employee = require("../models/employee");
const stripe = require("stripe")(
  "sk_test_51OsR0kIhkEOD0jDuYlIUtHrKBgfON9tlWV1eGD6Q89NpHV68bfTtDKbU3CMqm5vuvHH5wmRlqsz31sCVJF0YsqLr00uxAFuxYY"
);
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "computer",
              description: "no lid",
            },
            unit_amount: 1000,
          },
          quantity: 2,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    return res.status(200).json({ session: session.id, sessionInfo: session });
  } catch (error) {
    return res.status(404).json(error);
  }
};
