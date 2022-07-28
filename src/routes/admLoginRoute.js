const express = require("express");
const router = express.Router();

const admLoginController = require("../controllers/admLoginController");


router.get("/", admLoginController.adm_login);

module.exports = router;