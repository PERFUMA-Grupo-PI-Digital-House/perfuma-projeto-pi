const files = require("../helpers/files");
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const upload = require('../config/upload');
const path = require('path');
const fileName = path.join(__dirname, "..", "database", "users.json");


const userController = {

  // Lista todos os usuário
  // Pode retornar uma página ou não
  index: (req, res) => {
    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    // Filtra os usuários ativos
    const usersActive = allUsersJson.filter(user => user.ativo === true);
    return res.render('users', {
      title: 'Lista de usuários',
      listUsers: usersActive,
      user: req.cookies.user,
    });
  },
  // Mostra um usuário
  // Pode retornar uma página ou não
  show: (req, res) => {
    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4
    const { id } = req.params;
    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const userResult = allUsersJson.find(user => user.id === parseInt(id));

    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Usuário não encontrado",
      });
    }

    const user = {
      ...userResult,
      avatar: files.base64Encode(upload.path + userResult.avatar),
    };

    return res.render("user-panel", {
      title: "Visualizar usuário",
      user,
    });
  },

  // Página para criar usuário
  create: (req, res) => {
    return res.render("user-create", { title: "Cadastrar usuário", user: req.cookies.user, });
  },
  // Cria usuário
  // Não retorna página
  store: (req, res) => {
    const errors = validationResult(req);
    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

    const { nome, sobrenome, email, senha, confirmar_senha } = req.body;


    // Verifica se os campos foram preenchidos corretamente
    if (!errors.isEmpty()) {
      fs.unlinkSync(upload.path + req.file.filename);
      return res.render("user-create", { title: "Cadastrar usuário", errors: errors.mapped(), old: req.body });
    }

    // Verifica se o email já está cadastrado
    const userExists = allUsersJson.find(user => user.email === email);

    if (userExists) {
      return res.render('user-create', {
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
      return res.render('user-create', {
        title: "Error",
        errors: {
          confirmar_senha: {
            msg: "Senhas não coincidem",
          }
        },
        old: req.body
      });
    }

    // Atribui a variavel filename uma imagem default
    let filename = "user-default.jpeg";

    // Atribui ao avatar uma imagem default caso tenha tido algo de errado no download
    if (req.file) {
      filename = req.file.filename;
    }

    // Atribui 1 se não tiver nenhum usuário cadastrado, caso contrario ele pega o valor do último usuário e acrescenta + 1 
    const lastId = allUsersJson.length != 0 ? allUsersJson[allUsersJson.length - 1].id + 1 : 1;

    // Objeto com dados do novo usuário
    const newUser = {
      id: lastId,
      nome,
      sobrenome,
      email,
      senha: bcrypt.hashSync(req.body.senha, 10),
      avatar: filename,
      admin: false,
      ativo: true,
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


    return res.redirect("/login");
  },

  // Página para editar usuário
  edit: (req, res) => {
    const { id } = req.params;

    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const userResult = allUsersJson.find(user => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);

    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }

    userResult.confirmar_senha = userResult.senha;
    return res.render("user-edit", {
      title: "Editar usuário",
      user: userResult,
    });
  },

  // Edita usuário
  // Não retorna página
  update: (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, email, senha, confirmar_senha } = req.body;

    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const userResult = allUsersJson.find(user => user.id === parseInt(id));

    let filename;
    if (req.file) {
      filename = req.file.filename;
    }

    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }

    // Verifica se a senha realmente está correta 
    if (senha !== confirmar_senha) {
      return res.render('user-create', {
        title: "Error",
        errors: {
          confirmar_senha: {
            msg: "Senhas não coincidem",
          }
        },
        old: req.body
      });
    }

    // Salvando as alterações n0 id encontrado do userResult
    if (nome) userResult.nome = nome;
    if (sobrenome) userResult.sobrenome = sobrenome;
    if (email) userResult.email = email;
    if (senha) userResult.senha = senha;
    if (filename) {
      let avatarTmp = userResult.avatar;
      fs.unlinkSync(upload.path + avatarTmp);
      userResult.avatar = filename;
    }
    userResult.modificadoEm = new Date();

    fs.writeFileSync(
      // Caminho e nome do arquivo que será criado/atualizado
      fileName,
      // Conteúdo que será salvo no arquivo
      JSON.stringify(allUsersJson, null, " ")
    );

    return res.render("success", {
      title: "Usuário atualizado",
      message: `Usuário ${userResult.nome} foi atualizado`,
    });
  },

  // Deleta usuário
  // Não retorna página
  delete: (req, res) => {
    const { id } = req.params;
    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const userResult = allUsersJson.find(user => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    const user = {
      ...userResult,
      avatar: files.base64Encode(upload.path + userResult.avatar),
    };
    return res.render("user-delete", {
      title: "Deletar usuário",
      user,
      user: req.cookies.user,
    });
  },

  // O método acima pode ser chamado de destroy
  destroy: (req, res) => {
    const { id } = req.params;
    const allUsersJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    const userResult = allUsersJson.find(user => user.id === parseInt(id));
    if (!userResult) {
      return res.render("not-found", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    // Torna o usuário inativo
    userResult.ativo = false;

    fs.writeFileSync(
      // Caminho e nome do arquivo que será criado/atualizado
      fileName,
      // Conteúdo que será salvo no arquivo
      JSON.stringify(allUsersJson, null, " ")
    );

    // fs.unlinkSync(upload.path + userResult.avatar);
    // allUsersJson.splice(userResult, 1);

    // fs.writeFileSync(
    //   // Caminho e nome do arquivo que será criado/atualizado
    //   fileName,
    //   // Conteúdo que será salvo no arquivo
    //   JSON.stringify(allUsersJson, null, " ")
    // );

    return res.render("success", {
      title: "Usuário deletado",
      message: "Usuário deletado com sucesso!",
    });
  },

  profile: (req, res) => {
    return res.render("user-panel", { title: "Perfil", user: req.cookies.user, });
  },

};
module.exports = userController;