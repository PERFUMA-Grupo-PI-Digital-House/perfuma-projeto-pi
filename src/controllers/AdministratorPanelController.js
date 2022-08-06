const administratorPanelController = {
    showPanel: (req, res) => {
        return res.render('administrator-panel', { title: "Administrador", user: req.cookies.user, admin: req.cookies.admin});
    },
};

module.exports = administratorPanelController;