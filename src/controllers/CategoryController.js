const files = require("../helpers/files");
const fs = require('fs');
const { validationResult } = require('express-validator');
const upload = require('../config/upload');
const path = require('path');
const fileName = path.join(__dirname, "..", "database", "category.json");


const categoryController = {
    index: (req, res) => {

        const allCategorysJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        res.render('categorys', { 
            title: "Categorias", 
            listCategorys: allCategorysJson,
            user: req.cookies.user,});
    },

    show: (req, res) => {
        const { id } = req.params;
        const allCategorysJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const categoryResult = allCategorysJson.find(category => category.id === parseInt(id));

        if (!categoryResult) {
            return res.render("not-found", {
                title: "Erro",
                message: "Erro ao encontar categoria",
            });
        }

        return res.render("categorys", {
            title: "Visualizar categoria",
            category: categoryResult,
        });
    },
    
    create: (req, res) => {
        // Salvar no banco
        return res.render("category-create", {
            title: "Cadastrar categoria",
            user: req.cookies.user,
        });
    },

    store: (req, res) => {
        const errors = validationResult(req);
        const allCategorysJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

        const { nome, descricao } = req.body;

        if (!errors.isEmpty()) {
            return res.render("category-create", { title: "Cadastrar categoria", errors: errors.mapped(), old: req.body });
        }

        const categoryExists = allCategorysJson.find(category => category.nome === nome);

        if (categoryExists) {
            return res.render('category-create', {
                title: "Error",
                errors: {
                    nome: {
                        msg: "Esta categoria já está registrada"
                    }
                },
                old: req.body
            });
        }

        const lastId = allCategorysJson.length != 0 ? allCategorysJson[allCategorysJson.length - 1].id + 1 : 1;

        const newCategory = {
            id: lastId,
            nome,
            descricao,
            criadoEm: new Date(),
            modificadoEm: new Date(),
        };

        allCategorysJson.push(newCategory);
        fs.writeFileSync(
            // Caminho e nome do arquivo que será criado/atualizado
            fileName,
            // Conteúdo que será salvo no arquivo
            JSON.stringify(allCategorysJson, null, " ")
        );

        return res.redirect("/category");


    },

    edit: (req, res) => {
        const { id } = req.params;
        const allCategorysJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

        const categoryResult = allCategorysJson.find(category => category.id === parseInt(id));
        if (!categoryResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhuma categoria encontrada",
            });
        }
        return res.render("category-edit", {
            title: "Editar categoria",
            category: categoryResult,
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { nome, descricao } = req.body;

        const allCategorysJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const categoryResult = allCategorysJson.find((category) => category.id === parseInt(id));

        

        if (!categoryResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhuma categoria encontrada",
            });
        }

        if (nome) categoryResult.nome = nome;
        if (descricao) categoryResult.descricao = descricao;

        categoryResult.modificadoEm = new Date();

        fs.writeFileSync(
            // Caminho e nome do arquivo que será criado/atualizado
            fileName,
            // Conteúdo que será salvo no arquivo
            JSON.stringify(allCategorysJson, null, " ")
        );

        return res.render("success", {
            title: "Categoria atualizada",
            message: `Categoria ${categoryResult.nome} foi atualizada`,
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        const allCategorysJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const categoryResult = allCategorysJson.find((category) => category.id === parseInt(id));
        if (!categoryResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhuma categoria encontrada",
            });
        }

        return res.render("category-delete", {
            title: "Deletar categoria",
            category: categoryResult,
            user: req.cookies.user,
        });
    },
    // O método acima pode ser chamado de destroy
    destroy: (req, res) => {
        const { id } = req.params;
        const allCategorysJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const categoryResult = allCategorysJson.findIndex((category) => category.id === parseInt(id));
        if (!categoryResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhuma categoria encontrada",
            });
        }

        allCategorysJson.splice(categoryResult, 1);

        fs.writeFileSync(
            // Caminho e nome do arquivo que será criado/atualizado
            fileName,
            // Conteúdo que será salvo no arquivo
            JSON.stringify(allCategorysJson, null, " ")
        );

        return res.render("success", {
            title: "Categoria deletada",
            message: "Categoria deletada com sucesso!",
        });
    },

};


module.exports = categoryController;