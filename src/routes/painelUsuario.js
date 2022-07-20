const express = require("express");
const router = express.Router();

const painelUsuarioController = require("../controllers/painelUsuarioController");


router.get("/", painelUsuarioController.painelUsuario);

module.exports = router;