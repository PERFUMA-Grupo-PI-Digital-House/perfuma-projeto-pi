const fs = require('fs');
const path = require("path");
const bcrypt = require("../helpers/bcrypt");

const { validationResult } = require('express-validator');
const fileName = path.join(__dirname, "..", "database", "users.json");



const authController = {
  // Tela para cadastro do usuário
  register: (req, res) => {
    return res.render("cadastrar-usuario", {
      title: "Cadastro",
      user: req.cookies.user,
      admin: req.cookies.admin,
    });
  },
  // Processamento do cadastro do usuário
  create: (req, res) => {
    const errors = validationResult(req);
    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

    const { nome, email, senha, confirmar_senha } = req.body;

    // Verifica se os campos foram preenchidos corretamente
    if (!errors.isEmpty()) {
      return res.render("cadastrar-usuario", { title: "Cadastrar usuário", errors: errors.mapped(), old: req.body });
      
    }

    // Verifica se o email já está cadastrado
    const userExists = allUsersJson.find(user => user.email === email);

    if (userExists) {
      return res.render('cadastrar-usuario', {
        title: "Error",
        errors: {
          email: {
            msg: "Este email já está registrado"
          }
        },
        old: req.body
      });
    }

    // Verifica se a senha realmente está correta 
    if (senha !== confirmar_senha) {
      return res.render('cadastrar-usuario', {
        title: "Error",
        errors: {
          confirmar_senha: {
            msg: "Senhas não coincidem",
          }
        },
        old: req.body
      });
    }

    const lastId = allUsersJson.length != 0 ? allUsersJson[allUsersJson.length - 1].id + 1 : 1;
    // Objeto com dados do novo usuário
    const newUser = {
      id: lastId,
      nome,
      senha: bcrypt.generateHash(senha),
      email,
      admin: false,
      criadoEm: new Date(),
      modificadoEm: new Date(),
    };

    allUsersJson.push(newUser);
    fs.writeFileSync(
      // Caminho e nome do arquivo que será criado/atualizado
      fileName,
      // Conteúdo que será salvo no arquivo
      JSON.stringify(allUsersJson, null, " ")
    );
    return res.redirect("/");
  },
  // Tela para realizar login
  login: (req, res) => {
    return res.render("login", {
      title: "Login",
      user: req.cookies.user,
      admin: req.cookies.admin,
    });
  },
  // Processamento do login
  auth: (req, res) => {

    res.clearCookie("user");
    res.clearCookie("admin");

    const usersJson = fs.readFileSync(
      path.join(__dirname, "..", "database", "users.json"),
      "utf-8"
    );

    const users = JSON.parse(usersJson);

    const { email, senha } = req.body;

    const userAuth = users.find((user) => {
      if (user.email === email) {
        return bcrypt.compareHash(senha, user.senha)
      }
    });

    if (!userAuth) {
      return res.render("login", {
        title: "Error",
        errors: {
          msg: "Email ou senha inválidos",
        },
      });
    }

    

    // Filtra as chaves que o objeto irá ter
    const user = JSON.parse(
      JSON.stringify(userAuth, ["id", "nome", "admin"])
    );
    
    req.session.usuario = user;
    

    res.cookie("user", user.nome);
    res.cookie("admin", user.admin);

    if (req.session.usuario.admin) {
      return res.redirect("/adm");
    }

    return res.redirect("/");

  },
  // Processamento do deslogar
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("user");
    res.clearCookie("admin");

    return res.redirect("/");
  },

  profile: (req, res) => {
    return res.redirect("/usuarioPainel")
  },

  forgout: (req, res) => { },
  remember: (req, res) => { },
  reset: (req, res) => { },
};

module.exports = authController;