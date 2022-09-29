const files = require("../helpers/files");
const upload = require("../config/upload");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Image = require("../models/Image");
const { Op } = require("sequelize");


const indexController = {
  // Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      const products = await Product.findAll({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity",
          "category_id",
          "image_id",
        ],
        where: {
          is_active: 1,
        },
        include: [
          {
            model: Category,
            required: true,
          },
          {
            model: Image,
            required: true,
          },
        ],
      });

      if (!products) {
        throw Error("PRODUCT_NOT_FOUND");
      }
      products.map((product) => {
        if (product.Image) {
          product.Image.image = files.base64Encode(
            upload.path + product.Image.image
          );
        }
      });

      console.log(products);

      if(req.cookies.user){
        if (req.cookies.user.is_admin === 1) {
          return res.redirect("/administrator");
        }
      }

      return res.render("index", {
        title: "Perfuma",
        listProducts: products,
        user: req.cookies.user,
      });
    } catch (error) {

      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("index", {
          title: "Perfuma",
          message: "Nenhum produto encontrado",
        });
      } else {
        res.render("index", {
          title: "Perfuma",
          message: "Erro ao encontrar os produtos",
        });
      }
    }
  },

  search: async (req, res) => {
    try {
      const { page = 1, key } = req.query;

      const { count: total, rows: products } = await Product.findAndCountAll({
        attributes: [
          "id",
          "name",
          "description",
          "price",
          "quantity",
          "category_id",
          "image_id",
        ],
        where: {
          name: { [Op.like]: `%${key}%` },
        },
        include: [
          {
            model: Category,
            required: true,
          },
          {
            model: Image,
            required: true,
          },
        ],
        limit: 6,
        offset: (page - 1) * 6,
        order: [["name", "ASC"]],
      });


      const totalPage = Math.round(total / 5);

      if (!products) {
        throw Error("PRODUCT_NOT_FOUND");
      }

      products.map((product) => {
        if (product.Image) {
          product.Image.image = files.base64Encode(
            upload.path + product.Image.image
          );
        }
      });


      return res.render("list-search", {
        title: "Produtos",
        listProducts: products,
        searchKey: key,
        totalPage,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "PRODUCT_NOT_FOUND") {
        res.render("list-search", {
          title: "Produtos",
          errors: { message: "Nenhum produto encontrado" },
        });
      } else {
        res.render("list-search", {
          title: "Produtos",
          errors: { message: "Erro ao encontrar os produtos" },
        });
      }
    }
  },
};
module.exports = indexController;
