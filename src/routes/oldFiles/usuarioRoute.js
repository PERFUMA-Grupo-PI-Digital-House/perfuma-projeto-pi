const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/UsuarioController");


router.get("/", usuarioController.create);

module.exports = router;