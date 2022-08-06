const finalizarCompraController= {
    finalizarCompra: (req, res) => {
      return res.render("finalizar-compra", {title: "Finalizar Compra", user: req.cookies.user,
      admin: req.cookies.admin,});
    },
  };
  module.exports = finalizarCompraController;