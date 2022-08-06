const express = require("express");
const router = express.Router();

const painelAdmController = require("../controllers/PainelAdmController");


router.get("/", painelAdmController.viewAdmProduto);

router.get("/teste", painelAdmController.viewProduto);


module.exports = router;