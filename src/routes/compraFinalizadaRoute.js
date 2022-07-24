const express = require("express");
const router = express.Router();

const compraFinalizadaController = require("../controllers/CompraFinalizadaController");


router.get("/", compraFinalizadaController.compraFinalizada);

module.exports = router;