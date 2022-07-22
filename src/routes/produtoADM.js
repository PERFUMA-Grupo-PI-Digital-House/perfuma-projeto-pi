const express = require("express");
const router = express.Router();

const produtoADMController = require("../controllers/ProdutoADMController");


router.get("/", produtoADMController.produtoADM);

module.exports = router;