const express = require("express");
const router = express.Router();

const finalizarCompraController = require("../controllers/FinalizarCompraController");


router.get("/", finalizarCompraController.finalizarCompra);

module.exports = router;