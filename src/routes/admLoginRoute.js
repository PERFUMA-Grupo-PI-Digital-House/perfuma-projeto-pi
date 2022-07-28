const express = require("express");
const router = express.Router();

const admLoginController = require("../controllers/admLoginController");


router.get("/", admLoginController.admLogin);

module.exports = router;