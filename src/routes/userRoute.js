const express = require('express');
const router = express.Router();

// Controllers
const userController = require('../controllers/UserController');

// Middlewares
const upload = require('../middlewares/multer');
const validator = require('../middlewares/validatorRegisterMiddleware');
const isAuth = require('../middlewares/auth');
const isGuest = require("../middlewares/guest");


// Criar usuário
router.get("/create", isAuth, userController.create);
router.post("/create", isAuth, upload.single('avatar'), validator, userController.store);

// Editar usuário
router.get("/edit/:id",isAuth, userController.edit);
router.put("/edit/:id",isAuth, upload.single('avatar'), userController.update);

// Deletar usuário
router.get("/delete/:id",isAuth, userController.delete);
router.delete("/delete/:id",isAuth, userController.destroy);

// Rota para página perfil do usuário
router.get("/profile", isAuth, userController.profile);

// Rota para pesquisa de usuário
router.get("/search", isAuth, userController.search);

// Visualizar usuário
router.get("/",isAuth, userController.index);
router.get('/:id',isAuth, userController.show);


module.exports = router;