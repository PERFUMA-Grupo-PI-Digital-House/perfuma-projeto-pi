const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Image = db.define(
  "Image",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: Sequelize.DataTypes.STRING(400),
      allowNull: false,
    },
  },
);

module.exports = Image;