const usuarioPainelController = {
  painelUsuario: (req, res) => {
    return res.render("painel-usuario", {title: "Perfil", user: req.cookies.user, admin: req.cookies.admin});
  },
};
module.exports = usuarioPainelController;
