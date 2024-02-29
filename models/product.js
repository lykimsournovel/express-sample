const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Product = sequelize.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: Sequelize.STRING,
});

module.exports = Product;
