const SobreNosController = {
    sobreNos: (req, res) => {
        return res.render('sobre-nos', { title: "Sobre Nós", user: req.cookies.user,});
    },
};

module.exports = SobreNosController;