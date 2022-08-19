const express = require('express');
const router = express.Router();


//Controller
const orderController = require('../controllers/OrderController');

// Middlewares
const isAuth = require('../middlewares/auth');


router.get('/',isAuth, orderController.index);



module.exports = router;