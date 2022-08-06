const files = require("../helpers/files");
const fs = require('fs');
const { validationResult } = require('express-validator');
const upload = require('../config/upload');
const path = require('path');
const fileName = path.join(__dirname, "..", "database", "product.json");


const productController = {

    // Lista todos os produtos
    // Pode retornar uma página ou não
    index: (req, res) => {
        const allProductsJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        return res.render('administrator-panel', {
            title: 'Lista de produtos',
            listProducts: allProductsJson,
            user: req.cookies.user,
            admin: req.cookies.admin,
        });
    },
    // Mostra um produto
    // Pode retornar uma página ou não
    show: (req, res) => {},
    // Página para criar produto
    create: (req, res) => {},
    // Cria produto
    // Não retorna página
    store: (req, res) => {},
    // Página para editar produto
    edit: (req, res) => {},
    // Edita produto
    // Não retorna página
    update: (req, res) => {},
    // Deleta produto
    // Não retorna página
    delete: (req, res) => {},
    // O método acima pode ser chamado de destroy
    destroy: (req, res) => {},

};
module.exports = productController;