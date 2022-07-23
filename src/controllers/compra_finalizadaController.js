const compra_finalizadaController= {
    compra_finalizada: (req, res) => {
      return res.render("compra_finalizada", {title: "Compra Finalizada"});
    },
  };
  module.exports = compra_finalizadaController;