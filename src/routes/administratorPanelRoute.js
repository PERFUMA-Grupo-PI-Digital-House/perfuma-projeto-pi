const express = require('express');
const router = express.Router();

// Controllers
const administratorPanelController = require('../controllers/administratorPanelController');

// Rotas
router.get('/adm', administratorPanelController.showPanel);


module.exports = router;