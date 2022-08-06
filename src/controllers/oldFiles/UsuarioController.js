const usuarioController= {
    create: (req, res) => {
      return res.render("cadastrar-usuario", {title: "Criar Conta", user: req.cookies.user, admin: req.cookies.admin});
    },
  };
  module.exports = usuarioController;