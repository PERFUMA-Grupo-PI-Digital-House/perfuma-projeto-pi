const painelUsuarioController = {
  painelUsuario: (req, res) => {
    return res.render("painelUsuario", {title: "Painel de Usuario"});
  },
};
module.exports = painelUsuarioController;
