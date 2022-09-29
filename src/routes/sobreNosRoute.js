const express = require("express");
const router = express.Router();

// Controllers
const SobreNosController = require("../controllers/SobreNosController");

router.get("/", SobreNosController.sobreNos);


module.exports = router;