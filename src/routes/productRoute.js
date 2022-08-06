const express = require('express');
const router = express.Router();


// Controllers
const productControlller = require('../controllers/ProductController');

// Middlewares
const upload = require('../middlewares/multer');
const validator = require('../middlewares/validatorProduct');

router.get("/create", productControlller.create);
router.post("/create", upload.single('imageProduct'), validator, productControlller.store);

router.get("/edit/:id", productControlller.edit);
router.put("/edit/:id", productControlller.update);

router.get("/delete/:id", productControlller.delete);
router.delete("/delete/:id", productControlller.destroy);

router.get("/", productControlller.index);
router.get("/:id", productControlller.show);

module.exports = router;