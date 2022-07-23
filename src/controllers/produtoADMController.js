const produtoADMController = {
    produtoADM: (req, res) => {
      return res.render("produtoADM", {title: "Produtos"});
    },
  };
  module.exports = produtoADMController;
