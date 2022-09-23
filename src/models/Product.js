const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Order = require("./Order");
const OrderProduct = require("./OrderProduct");
const Category = require("./Category");
const Image = require("./Image");

const Product = db.define(
  "Product",
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
    price: {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    is_active: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
    },
    image_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    category_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },
    
  },
);

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "product_id",
  otherKey: "order_id",
});
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "order_id",
  otherKey: "product_id",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
});

Image.hasMany(Product, {
  foreignKey: "image_id",
});

Product.belongsTo(Image, {
  foreignKey: "image_id",
});

module.exports = Product;
