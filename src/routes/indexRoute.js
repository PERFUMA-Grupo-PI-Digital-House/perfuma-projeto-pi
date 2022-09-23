const express = require("express");
const router = express.Router();

// Controllers
const indexControlller = require("../controllers/IndexController");

router.get("/", indexControlller.index);

router.get("/search", indexControlller.search);

module.exports = router;
