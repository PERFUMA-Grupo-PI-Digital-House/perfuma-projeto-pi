const usuarioPainelController = {
  painelUsuario: (req, res) => {
    return res.render("painel-usuario", {title: "Painel de Usuario"});
  },
};
module.exports = usuarioPainelController;
