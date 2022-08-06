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
  index: (req, res) => {},
  // Mostra um usuário
  // Pode retornar uma página ou não
  show: (req, res) => {},
  // Página para criar usuário
  create: (req, res) => {},
  // Cria usuário
  // Não retorna página
  store: (req, res) => {},
  // Página para editar usuário
  edit: (req, res) => {},
  // Edita usuário
  // Não retorna página
  update: (req, res) => {},
  // Deleta usuário
  // Não retorna página
  delete: (req, res) => {},
  // O método acima pode ser chamado de destroy
  destroy: (req, res) => {},

};
module.exports = userController;