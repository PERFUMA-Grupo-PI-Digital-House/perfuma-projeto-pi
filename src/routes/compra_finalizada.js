const express = require("express");
const router = express.Router();

const compra_finalizadaController = require("../controllers/compra_finalizadaController");


router.get("/", compra_finalizadaController.compra_finalizada);

module.exports = router;