const express = require("express");
const router = express.Router();

// Controllers
const authController = require('../controllers/AuthController');

// Middlewares
const validator = require('../middlewares/validatorRegisterMiddleware');
const isAuth = require('../middlewares/auth');
const isGuest = require("../middlewares/guest");
const upload = require('../middlewares/multer');


// Rota para página login
router.get("/login", isGuest, authController.login);
router.post("/login", isGuest, authController.auth);

// Rota para página registrar
router.get("/register", isGuest, authController.register);
router.post("/register", isGuest, upload.single('avatar'), validator, authController.create);

// Rota para página perfil do usuário
router.get("/profile", isAuth, authController.profile);

// Rota para sair do login
router.get("/logout", isAuth, authController.logout);



module.exports = router;