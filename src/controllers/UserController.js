const fs = require("fs");
const files = require("../helpers/files");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const upload = require("../config/upload");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Image = require("../models/Image");
const { Op } = require("sequelize");

const userController = {
  // Lista todos os usuário
  // Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      const { page = 1 } = req.query;
      const { count: total, rows: users } = await User.findAndCountAll({
        attributes: ["id", "name", "last_name", "email", "image", "is_admin"],
        where: {
          is_active: 1,
        },
        limit: 6,
        offset: (page - 1) * 6,
        order: [["name", "ASC"]],
      });
      const totalPage = Math.round(total / 5);

      if (!users) {
        throw Error("USER_NOT_FOUND");
      }

      users.map((user) => {
        if (user.image) {
          user.image = files.base64Encode(upload.path + user.image);
        }
      });

      return res.render("users", {
        title: "Lista de usuários",
        listUsers: users,
        totalPage,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        res.render("users", {
          title: "Usuários",
          message: "Nenhum usuário encontrado",
        });
      } else {
        res.render("users", {
          title: "Usuários",
          message: "Erro ao encontrar os usuário",
        });
      }
    }
  },
  // Mostra um usuário
  // Pode retornar uma página ou não
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        attributes: ["id", "name", "last_name", "email", "password", "image"],
        where: {
          id,
        },
        include: {
          model: Order,
          required: true,
        },
      });

      const orders = await Order.findAll({
        attributes: ["id", "status", "created_at", "user_id"],
        where: {
          user_id: user.id,
        },
        include: {
          model: Product,
          required: true,
        },
      });


      const idsImage = orders.map((order) =>
        order.Products.map((product) => product.image_id)
      );

      const products = await Product.findAll({
        where: {
          image_id: idsImage,
        },
        include: {
          model: Image,
          required: true,
        },
      });

      if (!user) {
        throw Error("USER_NOT_FOUND");
      }

      user.image = files.base64Encode(upload.path + user.image);

      return res.render("user-panel", {
        title: "Visualizar usuário",
        user,
        listOrders: orders,
      });
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        res.render("user-panel", {
          title: "Visualizar usuário",
          message: "Usuário não encontrado!",
        });
      } else {
        res.render("user-panel", {
          title: "Visualizar usuário",
          message: "Erro ao encontrar usuário!",
        });
      }
    }
  },

  // Página para criar usuário
  create: (req, res) => {
    return res.render("user-create", {
      title: "Cadastrar usuário",
      user: req.cookies.user,
    });
  },
  // Cria usuário
  // Não retorna página
  store: async (req, res) => {
    const errors = validationResult(req);
    const { nome, sobrenome, email, senha, confirmar_senha } = req.body;

    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(upload.path + req.file.filename);
      }
      return res.render("user-create", {
        title: "Cadastrar usuário",
        errors: errors.mapped(),
        old: req.body,
      });
    }

    // Atribui a variavel filename uma imagem default
    let filename = "user-default.jpeg";

    // Atribui ao avatar uma imagem default caso tenha tido algo de errado no download
    if (req.file) {
      filename = req.file.filename;
    }

    // Verifica se a senha realmente está correta
    if (senha !== confirmar_senha) {
      return res.render("user-create", {
        title: "Error",
        errors: {
          confirmar_senha: {
            msg: "Senhas não coincidem",
          },
        },
        old: req.body,
      });
    }

    try {
      const senhaBcrypt = await bcrypt.hashSync(req.body.senha, 10);
      const userExists = await User.findOne({
        attributes: ["email"],
        where: {
          email: email,
        },
      });

      if (userExists) {
        return res.render("user-create", {
          title: "Error",
          errors: {
            email: {
              msg: "Este email já está registrado",
            },
          },
          old: req.body,
        });
      }

      const users = await User.create({
        name: nome,
        last_name: sobrenome,
        email,
        password: senhaBcrypt,
        image: filename,
      });
      res.render("user-create", {
        title: "Sucesso",
        message: `Usuário ${users.name} foi cadastrado com sucesso!`,
      });
    } catch (error) {
      res.render("user-create", {
        title: "Erro",
        message: "Erro ao cadastrar usuário!",
      });
    }
  },

  // Página para editar usuário
  edit: async (req, res) => {
    const { id } = req.params;

    try {
      const users = await User.findOne({
        attributes: ["id", "name", "last_name", "email", "password", "image"],
        where: {
          id,
        },
      });

      if (!users) {
        throw Error("USER_NOT_FOUND");
      }

      if (req.cookies.user.is_admin === 1) {
        return res.render("user-edit-adm", {
          title: "Editar usuário",
          user: req.cookies.user,
          users,
        });
      } else {
        return res.render("user-edit", {
          title: "Editar usuário",
          user: req.cookies.user,
          users,
        });
      }
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        res.render("user-edit", {
          title: "Usuários",
          message: "Nenhum usuário encontrado",
        });
      } else {
        res.render("user-edit", {
          title: "Usuários",
          message: "Erro ao editar os usuário",
        });
      }
    }
  },

  // Edita usuário
  // Não retorna página
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, senha, confirmar_senha } = req.body;

    let filename;
    if (req.file) {
      filename = req.file.filename;
    }

    // Verifica se a senha realmente está correta
    if (senha !== confirmar_senha) {
      return res.render("user-create", {
        title: "Error",
        errors: {
          confirmar_senha: {
            msg: "Senhas não coincidem",
          },
        },
        old: req.body,
      });
    }

    try {
      const users = await User.update(
        {
          name: nome,
          last_name: sobrenome,
          email,
          password: senha,
          image: filename,
        },
        {
          where: { id },
        }
      );
      if (req.cookies.user.admin) {
        return res.render("user-edit-adm", {
          title: "Editar usuário",
          user: req.cookies.user,
          users,
          message: `Usuário atualizado com sucesso!`,
        });
      } else {
        return res.render("user-edit", {
          title: "Usuário Atualizado",
          user: req.cookies.user,
          users,
          message: `Usuário atualizado com sucesso!`,
        });
      }
    } catch (error) {
      res.render("user-edit", {
        title: "Usuários",
        errors: {
          message: "Erro ao editar os usuário",
        },
      });
    }
  },

  // Deleta usuário
  // Não retorna página
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const users = await User.findOne({
        attributes: ["id", "name", "last_name", "email", "password", "image"],
        where: {
          id,
        },
      });

      if (!users) {
        throw Error("USER_NOT_FOUND");
      }

      users.image = files.base64Encode(upload.path + users.image);

      return res.render("user-delete", {
        title: "Deletar usuário",
        users,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        res.render("user-delete", {
          title: "Usuários",
          errors: { message: "Nenhum usuário encontrado" },
        });
      } else {
        res.render("user-delete", {
          title: "Usuários",
          errors: { message: "Erro ao deletar usuário" },
        });
      }
    }
  },

  // O método acima pode ser chamado de destroy
  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.update(
        {
          is_active: 0,
        },
        {
          where: { id },
        }
      );

      return res.render("user-delete", {
        title: "Usuário deletado",
        message: "Usuário deletado com sucesso!",
      });
    } catch (error) {
      res.render("user-delete", {
        title: "Usuários",
        errors: { message: "Erro ao deletar usuário" },
      });
    }
  },

  profile: (req, res) => {
    return res.render("user-panel", {
      title: "Perfil",
      user: req.cookies.user,
    });
  },

  search: async (req, res) => {
    try {
      const { page = 1, key } = req.query;
      const { count: total, rows: users } = await User.findAndCountAll({
        attributes: ["id", "name", "last_name", "email", "image", "is_admin"],
        where: {
          name: { [Op.like]: `%${key}%` },
        },
        limit: 6,
        offset: (page - 1) * 6,
        order: [["name", "ASC"]],
      });

      const totalPage = Math.round(total / 5);

      if (!users) {
        throw Error("USER_NOT_FOUND");
      }

      return res.render("users", {
        title: "Lista de usuários",
        listUsers: users,
        totalPage,
        user: req.cookies.user,
      });
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        res.render("users", {
          title: "Usuários",
          errors: { message: "Nenhum usuário encontrado" },
        });
      } else {
        res.render("users", {
          title: "Usuários",
          errors: { message: "Erro ao encontrar os usuário" },
        });
      }
    }
  },
};
module.exports = userController;
