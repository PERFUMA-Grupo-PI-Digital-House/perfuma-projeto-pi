const { validationResult } = require("express-validator");
const files = require("../helpers/files");
const upload = require("../config/upload");

const Category = require("../models/Category");
const Product = require("../models/Product");
const Image = require("../models/Image");

const categoryController = {
  index: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const { count: total } = await Category.findAndCountAll({
        where: {
          is_active: 1,
        }
      });
      const categorys  = await Category.findAll({
        attributes: ["id", "name", "description", "is_active"],
        where: {
          is_active: 1,
        },
        include: {
          model: Product,
          required: true,
        },
        limit: 6,
        offset: (page - 1) * 6,
        order: [["name", "ASC"]],
      });
      const totalPage = Math.round(total / 5);

      if (!categorys) {
        throw Error("CATEGORY_NOT_FOUND");
      }

      return res.render("categorys", {
        title: "Lista de categorias",
        listCategorys: categorys,
        totalPage,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        res.render("categorys", {
          title: "Categoria",
          message: "Nenhuma categoria encontrado",
        });
      } else {
        res.render("categorys", {
          title: "Categoria",
          message: "Erro ao encontrar as categorias",
        });
      }
    }
  },

  show: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findOne({
        attributes: ["id", "name", "description", "is_active"],
        where: {
          id,
        },
        include: {
          model: Product,
          required: true,
        },
      });

      if (!category) {
        throw Error("CATEGORY_NOT_FOUND");
      }

      const productImageId = category.Products.map(product => product.image_id);
      const products = await Product.findAll({
        attributes: ["name", "description", "price", "is_active"],
        where: {
          image_id: productImageId,
        },
        include: {
          model: Image,
          required: true,
        }
      });
      
      products.map(product => {
        console.log(product.Image);
          product.Image.image = files.base64Encode(upload.path + product.Image.image);
      })

      
      return res.render("products-category", {
        title: "Visualizar categoria",
        category,
        listProducts: products,
      });
    } catch (error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        res.render("products-category", {
          title: "Categoria",
          message: "Cagoria não encontrado!",
        });
      } else {
        res.render("products-category", {
          title: "Categoria",
          message: "Erro ao encontrar categoria!",
        });
      }
    }
  },

  create: (req, res) => {
    return res.render("category-create", {
      title: "Cadastrar categoria",
      user: req.cookies.user,
    });
  },

  store: async (req, res) => {
    const errors = validationResult(req);
    const { nome, descricao } = req.body;

    if (!errors.isEmpty()) {
      return res.render("category-create", {
        title: "Cadastrar categoria",
        errors: errors.mapped(),
        old: req.body,
      });
    }

    try {
      const categoryExists = await Category.findOne({
        attributes: ["name"],
        where: {
          name: nome,
        },
      });

      if (categoryExists) {
        return res.render("category-create", {
          title: "Error",
          errors: {
            nome: {
              msg: "Esta categoria já está registrada",
            },
          },
          old: req.body,
        });
      }
      const categorys = await Category.create({
        name: nome,
        description: descricao,
      });
      res.render("category-create", {
        title: "Sucesso",
        message: `Categoria ${categorys.name} foi cadastrado com sucesso!`,
      });
    } catch (error) {
      res.render("category-create", {
        title: "Erro",
        message: "Erro ao cadastrar categoria!",
      });
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;

    try {
      const category = await Category.findOne({
        attributes: ["id", "name", "description"],
        where: {
          id,
        },
      });

      if (!category) {
        throw Error("CATEGORY_NOT_FOUND");
      }

      return res.render("category-edit", {
        title: "Editar categoria",
        user: req.cookies.user,
        category,
      });
    } catch (error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        res.render("category-edit", {
          title: "Editar categoria",
          message: "Nenhuma categoria encontrada",
        });
      } else {
        res.render("category-edit", {
          title: "Editar categoria",
          message: "Erro ao editar categoria",
        });
      }
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    try {
      const category = await Category.update(
        {
          name: nome,
          description: descricao,
        },
        {
          where: { id },
        }
      );

      if (!category) {
        throw Error("CATEGORY_NOT_FOUND");
      }

      res.render("category-edit", {
        title: "Sucesso",
        message: `Categoria foi atualizado com sucesso!`,
        user: req.cookies.user,
        category,
      });
    } catch (error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        res.render("category-edit", {
          title: "Categoria",
          message: "Nenhuma categoria encontrada",
        });
      } else {
        res.render("category-edit", {
          title: "Categoria",
          message: "Erro ao editar categoria",
        });
      }
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const category = await Category.findOne({
        attributes: ["id", "name", "description"],
        where: {
          id,
        },
      });

      if (!category) {
        throw Error("CATEGORY_NOT_FOUND");
      }

      return res.render("category-delete", {
        title: "Deletar categoria",
        category,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "CATEGORY_NOT_FOUND") {
        res.render("category-delete", {
          title: "Categoria",
          errors: { message: "Nenhuma categoria encontrada" },
        });
      } else {
        res.render("category-delete", {
          title: "Categoria",
          errors: { message: "Erro ao deletar categoria" },
        });
      }
    }
  },
  // O método acima pode ser chamado de destroy
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.update(
        {
          is_active: 0,
        },
        {
          where: { id },
        }
      );

      return res.render("category-delete", {
        title: "Categoria deletada",
        message: "Categoria deletado com sucesso!",
      });
    } catch (error) {
      res.render("category-delete", {
        title: "Categoria",
        errors: { message: "Erro ao deletar categoria" },
      });
    }
  },
};

module.exports = categoryController;
