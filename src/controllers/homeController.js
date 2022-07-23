const homeController = {
  home: (req, res) => {
    return res.render("home", {title: "Perfuma"});
  },
};
module.exports = homeController;