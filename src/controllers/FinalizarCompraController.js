const finalizarCompraController= {
    finalizarCompra: (req, res) => {
      return res.render("finalizar-compra", {title: "Finalizar Compra"});
    },
  };
  module.exports = finalizarCompraController;