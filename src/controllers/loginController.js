const loginController = {
    login: (req, res) => {
      return res.render("login", {title: "login"});
    },
  };
  module.exports = loginController;