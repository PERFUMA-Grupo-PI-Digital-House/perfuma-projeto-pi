const express = require("express");
const router = express.Router();

const usuarioPainelController = require("../controllers/UsuarioPainelController");


router.get("/", usuarioPainelController.painelUsuario);

module.exports = router;