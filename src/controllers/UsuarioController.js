const usuarioController= {
    create: (req, res) => {
      return res.render("cadastrar-usuario", {title: "Criar Conta"});
    },
  };
  module.exports = usuarioController;