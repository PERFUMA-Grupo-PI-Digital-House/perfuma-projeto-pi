const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const produtoADMController = require("../controllers/produtoADMController");
=======
const produtoADMController = require("../controllers/ProdutoADMController");
>>>>>>> 9f5550f734261aa99615cd86f275ea2178a6d44c


router.get("/", produtoADMController.produtoADM);

module.exports = router;