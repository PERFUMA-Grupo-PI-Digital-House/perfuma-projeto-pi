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


        return res.render('products', {
            title: 'Lista de produtos',
            listProducts: allProductsJson,
            user: req.cookies.user,
        });
    },

    // Mostra um produto
    // Pode retornar uma página ou não
    show: (req, res) => {
        const { id } = req.params;
        const allProductsJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const productResult = allProductsJson.find(product => product.id === parseInt(id));

        if (!productResult) {
            return res.render("not-found", {
                title: "Erro",
                message: "Erro ao encontar produto",
            });
        }

        const product = {
            ...productResult,
            imageProduct: files.base64Encode(productResult.imageProduct),
        };


        return res.render("product", {
            title: "Visualizar produto",
            product,
        });
    },

    // Página para criar produto
    create: (req, res) => {
        // Salvar no banco
        return res.render("product-create", {
            title: "Cadastrar produto",
            user: req.cookies.user,
        });
    },
    // Cria produto
    // Não retorna página
    store: (req, res) => {
        const errors = validationResult(req);
        const allProductsJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

        const { nome, descricao, preco, imageProduct } = req.body;

        if (!errors.isEmpty()) {
            fs.unlinkSync(upload.path + req.file.filename);
            return res.render("product-create", { title: "Cadastrar produto", errors: errors.mapped(), old: req.body });
        }

        // Verifica se o produto já está cadastrado
        const productExists = allProductsJson.find(product => product.nome === nome);

        if (productExists) {
            return res.render('product-create', {
                title: "Error",
                errors: {
                    nome: {
                        msg: "Este produto já está registrado"
                    }
                },
                old: req.body
            });
        }

        // Atribui a variavel filename uma imagem default
        let filename = "product-default.jpeg";

        // Atribui ao produto uma imagem default caso tenha tido algo de errado no download
        if (req.file) {
            filename = req.file.filename;
        }

        // Atribui 1 se não tiver nenhum produto cadastrado, caso contrario ele pega o valor do último produto e acrescenta + 1 
        const lastId = allProductsJson.length != 0 ? allProductsJson[allProductsJson.length - 1].id + 1 : 1;

        const newProduct = {
            id: lastId,
            nome,
            descricao,
            preco,
            imageProduct: filename,
            criadoEm: new Date(),
            modificadoEm: new Date(),
        };

        allProductsJson.push(newProduct);
        fs.writeFileSync(
            // Caminho e nome do arquivo que será criado/atualizado
            fileName,
            // Conteúdo que será salvo no arquivo
            JSON.stringify(allProductsJson, null, " ")
        );

        return res.redirect("/product");


    },

    // Página para editar produto
    edit: (req, res) => {
        const { id } = req.params;
        const allProductsJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

        const productResult = allProductsJson.find((product) => product.id === parseInt(id));
        // const productResult = products.find((product) => product.id.toString() === id);
        if (!productResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }
        return res.render("product-edit", {
            title: "Editar produto",
            product: productResult,
            user: req.cookies.user,
        });
    },
    // Edita produto
    // Não retorna página
    update: (req, res) => {
        const { id } = req.params;
        const { nome, descricao, preco, imageProduct } = req.body;

        const allProductsJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const productResult = allProductsJson.find((product) => product.id === parseInt(id));

        let filename;
        if (req.file) {
            filename = req.file.filename;
        }

        if (!productResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }

        if (nome) productResult.nome = nome;
        if (descricao) productResult.descricao = descricao;
        if (preco) productResult.preco = preco;
        if (filename) {
            let imageProductTmp = productResult.imageProduct;
            fs.unlinkSync(upload.path + imageProductTmp);
            productResult.imageProduct = filename;
        }

        productResult.modificadoEm = new Date();

        fs.writeFileSync(
            // Caminho e nome do arquivo que será criado/atualizado
            fileName,
            // Conteúdo que será salvo no arquivo
            JSON.stringify(allProductsJson, null, " ")
        );

        return res.render("success", {
            title: "Produto atualizado",
            message: `Produto ${productResult.nome} foi atualizado`,
        });
    },
    // Deleta produto
    // Não retorna página
    delete: (req, res) => {
        const { id } = req.params;
        const allProductsJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const productResult = allProductsJson.find((product) => product.id === parseInt(id));
        // const productResult = products.find((product) => product.id.toString() === id);
        if (!productResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }

        const product = {
            ...productResult,
            imageProduct: files.base64Encode(upload.path + productResult.imageProduct),
        };

        return res.render("product-delete", {
            title: "Deletar produto",
            product,
            user: req.cookies.user,
            admin: req.cookies.admin,
        });
    },
    // O método acima pode ser chamado de destroy
    destroy: (req, res) => {
        const { id } = req.params;
        const allProductsJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
        const productResult = allProductsJson.findIndex((product) => product.id === parseInt(id));
        if (!productResult) {
            return res.render("not-found", {
                title: "Ops!",
                message: "Nenhum produto encontrado",
            });
        }

        fs.unlinkSync(upload.path + productResult.imageProduct);
        allProductsJson.splice(productResult, 1);

        fs.writeFileSync(
            // Caminho e nome do arquivo que será criado/atualizado
            fileName,
            // Conteúdo que será salvo no arquivo
            JSON.stringify(allProductsJson, null, " ")
        );

        return res.render("success", {
            title: "Produto deletado",
            message: "Produto deletado com sucesso!",
        });
    },

    viewProduct: (req, res) => {
        res.render('description-product', { title: "Produto", user: req.cookies.user, });
    },

    viewPayment: (req, res) => {
        res.render('product-payment', { title: "Pagamento", user: req.cookies.user, });
    },

    viewFinishPayment: (req, res) => {
        res.render('finished-product-payment', { title: "Compra finalizada", user: req.cookies.user, });
    },

    viewFinishPixPayment: (req, res) => {
        res.render('finished-product-payment-pix', { title: "Compra finalizada Pix", user: req.cookies.user, });
    },

};
module.exports = productController;