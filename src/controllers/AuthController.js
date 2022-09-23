const fs = require("fs");
const bcrypt = require("../helpers/bcrypt");
const { validationResult } = require("express-validator");

// Configuração para conexão com o banco de dados
const User = require("../models/User");

const authController = {
  // Tela para cadastro do usuário
  viewRegister: (req, res) => {
    return res.render("user-register", {
      title: "Cadastro",
    });
  },
  // Processamento do cadastro do usuário
  create: async (req, res) => {
    const errors = validationResult(req);
    const { nome, sobrenome, email, senha, confirmar_senha } = req.body;

    // Verifica se os campos foram preenchidos corretamente
    if (!errors.isEmpty()) {
      // if (req.file) {
      //   fs.unlinkSync(upload.path + req.file.filename);
      // }
      return res.render("user-register", {
        title: "Cadastro",
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
      return res.render("user-register", {
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
      const senhaBcrypt = await bcrypt.generateHash(senha);
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

      return res.redirect("/login");
    } catch (error) {
      res.render("user-create", {
        title: "Erro",
        message: "Erro ao cadastrar usuário!",
      });
    }
  },
  // Tela para realizar login
  login: (req, res) => {
    return res.render("user-login", {
      title: "Login",
      user: req.cookies.user,
    });
  },
  // Processamento do login
  auth: async (req, res) => {
    res.clearCookie("user");
    res.clearCookie("admin");
    const { email, senha } = req.body;

    try {
      const users = await User.findAll({
        attributes: [
          "id",
          "name",
          "last_name",
          "email",
          "password",
          "image",
          "is_admin",
        ],
        where: {
          is_active: 1,
        },
      });

      const userAuth = users.find((user) => {
        if (user.email === email) {
          return bcrypt.compareHash(senha, user.password);
        }
      });

      if (!userAuth) {
        throw Error("USER_NOT_FOUND");
      }
      req.session.usuario = userAuth;

      res.cookie("user", userAuth);

      if (req.session.usuario.is_admin === 1) {
        return res.redirect("/administrator");
      }

      return res.redirect("/");
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        return res.render("user-login", {
          title: "Error",
          errors: {
            msg: "Email ou senha inválidos",
          },
        });
      } else {
        res.render("user-login", {
          title: "Usuários",
          message: "Erro ao encontrar os usuário",
        });
      }
    }
  },

  // Processamento do deslogar
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.clearCookie("admin");

    return res.redirect("/");
  },

  forgout: (req, res) => {},
  remember: (req, res) => {},
  reset: (req, res) => {},
};

module.exports = authController;
