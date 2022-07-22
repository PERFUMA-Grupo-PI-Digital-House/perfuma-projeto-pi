const express = require("express");
const router = express.Router();

const painelUsuarioController = require("../controllers/PainelUsuarioController");


router.get("/", painelUsuarioController.painelUsuario);

module.exports = router;