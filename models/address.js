const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Address = sequelize.define("addresses", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  home_number: Sequelize.STRING,
  street: {
    type: Sequelize.STRING,
  },
  description: Sequelize.STRING,
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Address;
