const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Employee = sequelize.define(
  "employees",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    age: Sequelize.INTEGER,
    title: Sequelize.STRING,
    role: Sequelize.STRING,
    slug: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

module.exports = Employee;
