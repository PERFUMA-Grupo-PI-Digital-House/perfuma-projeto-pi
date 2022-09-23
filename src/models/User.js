const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Order = require("./Order");


const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(100),
      // Não permite valor nulo
      // Por padrão ele permite nulo
      allowNull: false,
    },
    last_name: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    image: {
      type: Sequelize.DataTypes.STRING(400),
    },
    is_active: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
    },
    is_admin: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },

  },

);

User.hasMany(Order, {
  foreignKey: "user_id",
});
Order.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = User;