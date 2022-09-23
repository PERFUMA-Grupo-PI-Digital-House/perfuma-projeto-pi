const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Order = db.define(
  "Order",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: Sequelize.DataTypes.ENUM("processando", "a caminho", "entregue"),
      defaultValue: "processando",
      allowNull: false,
    },
    is_active: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
    },
    user_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
    }
  },
  {
  }
);

module.exports = Order;