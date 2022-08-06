const indexController = {
    // Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("index", {title: "Perfuma", user: req.cookies.user, admin: req.cookies.admin})
    },
};
module.exports = indexController;