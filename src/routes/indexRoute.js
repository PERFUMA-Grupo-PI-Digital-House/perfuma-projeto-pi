const express = require('express');
const router = express.Router();

// Controllers
const indexControlller = require('../controllers/IndexController');

router.get("/", indexControlller.index);

module.exports = router;