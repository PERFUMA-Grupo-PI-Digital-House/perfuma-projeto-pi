const orderController = {
    index: (req, res) => {
        res.render('product-orders', { title: "Pedidos", users: req.cookies.usuario});
    },
};

module.exports = orderController;