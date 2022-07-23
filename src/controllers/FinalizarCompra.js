const finalizarCompraController= {
    finalizarCompra: (req, res) => {
      return res.render("finalizarCompra", {title: "Finalizar Compra"});
    },
  };
  module.exports = finalizarCompraController;