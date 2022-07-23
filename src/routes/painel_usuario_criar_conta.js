const express = require("express");
const router = express.Router();

const painel_usuario_criar_contaController = require("../controllers/painel_usuario_criar_contaController");


router.get("/", painel_usuario_criar_contaController.painel_usuario_criar_conta);

module.exports = router;