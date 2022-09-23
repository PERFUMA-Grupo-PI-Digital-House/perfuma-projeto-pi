const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Category = db.define(
  "Category",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    is_active: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
    },
  },
  {
    tableName: "categorys",
  }
);

module.exports = Category;
