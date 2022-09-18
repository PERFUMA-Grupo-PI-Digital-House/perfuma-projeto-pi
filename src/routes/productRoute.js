const express = require('express');
const router = express.Router();


// Controllers
const productControlller = require('../controllers/ProductController');

// Middlewares
const upload = require('../middlewares/multer');
const validator = require('../middlewares/validatorProduct');
const isAuth = require('../middlewares/auth');


router.get("/create",isAuth, productControlller.create);
router.post("/create",isAuth, upload.single('imageProduct'), validator, productControlller.store);

router.get("/edit/:id",isAuth, productControlller.edit);
router.put("/edit/:id",isAuth, productControlller.update);

router.get("/delete/:id",isAuth, productControlller.delete);
router.delete("/delete/:id",isAuth, productControlller.destroy);

router.get("/description", productControlller.viewProduct);

router.get("/payment", isAuth, productControlller.viewPayment);

router.get("/finish", isAuth, productControlller.viewFinishPayment);

router.get("/finishPix", isAuth, productControlller.viewFinishPixPayment);

router.get("/",isAuth, productControlller.index);
router.get("/:id",isAuth, productControlller.show);


module.exports = router;