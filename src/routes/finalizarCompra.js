const express = require("express");
const router = express.Router();

const finalizarCompraController = require("../controllers/FinalizarCompra");


router.get("/", finalizarCompraController.finalizarCompra);

module.exports = router;