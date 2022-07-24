const produtoController = {
    viewAdmProduto: (req, res) => {
      return res.render("painel-adm-produto", {title: "Produtos"});
    },

    viewProduto: (req, res) => {
      return res.render("produto-giovanna-baby", {title: "Produto"});
    },

  };
  module.exports = produtoController;
