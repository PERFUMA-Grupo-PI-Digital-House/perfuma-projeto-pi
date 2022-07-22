const homeController = {
  home: (req, res) => {
    return res.render("home", {title: "home"});
  },
};
module.exports = homeController;