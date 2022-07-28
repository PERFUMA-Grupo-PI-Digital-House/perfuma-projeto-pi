const AdmLoginController = {
    adm_login: (req, res) => {
      return res.render("adm_login", {title: "Adm Login"});
    },
  };
  module.exports = AdmLoginController ;