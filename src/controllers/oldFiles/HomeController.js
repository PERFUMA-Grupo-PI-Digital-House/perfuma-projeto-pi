const homeController = {
  home: (req, res) => {    
    return res.render("home", {title: "Perfuma", user: req.cookies.user, admin: req.cookies.admin});
  },
};
module.exports = homeController;