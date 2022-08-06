const compraFinalizadaController = {
    compraFinalizada: (req, res) => {
      return res.render("compra-finalizada", {title: "Compra Finalizada", user: req.cookies.user,
      admin: req.cookies.admin,});
    },
  };
  module.exports = compraFinalizadaController ;