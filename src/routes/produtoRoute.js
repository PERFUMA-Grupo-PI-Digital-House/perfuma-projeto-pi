const express = require("express");
const router = express.Router();

const produtoController = require("../controllers/ProdutoController");


router.get("/", produtoController.viewAdmProduto);

router.get("/teste", produtoController.viewProduto);


module.exports = router;