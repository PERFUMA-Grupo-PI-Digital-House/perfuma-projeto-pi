const express = require("express");
const router = express.Router();

const AdmLoginController = require("../controllers/AdmLoginController");


router.get("/", AdmLoginController.adm_login);

module.exports = router;