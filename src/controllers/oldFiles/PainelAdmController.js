const painelAdmController = {
    viewAdmProduto: (req, res) => {
      return res.render("painel-adm-produto", {title: "Produtos", user: req.cookies.user,
      admin: req.cookies.admin,});
    },

    viewProduto: (req, res) => {
      return res.render("produto-giovanna-baby", {title: "Produto"});
    },

  };
  module.exports = painelAdmController;
