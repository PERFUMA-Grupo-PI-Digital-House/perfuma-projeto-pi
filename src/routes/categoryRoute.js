const express = require('express');
const router = express.Router();

// Controllers
const categoryController = require('./../controllers/CategoryController');

// Middlewares
const isAuth = require('../middlewares/auth');


router.get("/create",isAuth, categoryController.create);
router.post("/create",isAuth, categoryController.store);

router.get("/edit/:id",isAuth, categoryController.edit);
router.put("/edit/:id",isAuth, categoryController.update);

router.get("/delete/:id",isAuth, categoryController.delete);
router.delete("/delete/:id",isAuth, categoryController.destroy);

router.get('/',isAuth, categoryController.index);


module.exports = router;