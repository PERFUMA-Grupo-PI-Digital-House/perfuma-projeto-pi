const express = require('express');
const router = express.Router();

// Controllers
const administratorPanelController = require('../controllers/administratorPanelController');

// Middlewares
const isAuth = require('../middlewares/auth');

// Rotas
router.get('/', isAuth, administratorPanelController.index);


module.exports = router;