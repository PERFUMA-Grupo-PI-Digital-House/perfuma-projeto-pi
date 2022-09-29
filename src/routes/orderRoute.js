const express = require('express');
const router = express.Router();


//Controller
const orderController = require('../controllers/OrderController');

// Middlewares
const isAuth = require('../middlewares/auth');


router.get("/create",isAuth, orderController.create);
router.post("/create",isAuth, orderController.store);

router.get("/edit/:id",isAuth, orderController.edit);
router.put("/edit/:id",isAuth, orderController.update);

router.get("/delete/:id",isAuth, orderController.delete);
router.delete("/delete/:id",isAuth, orderController.destroy);

router.get("/mycart", isAuth, orderController.viewMyCart);

router.get("/payment", isAuth, orderController.viewPayment);

router.get("/finish", isAuth, orderController.viewFinishPayment);

router.get("/finishPix", isAuth, orderController.viewFinishPixPayment);

router.get('/:id',isAuth, orderController.show);
router.get('/',isAuth, orderController.index);


module.exports = router;