exports.homePage = (req, res) => {
  res.render("index");
};

exports.viewPage = (req, res) => {
  res.render("view_employee");
};
exports.loginPage = (req, res) => {
  res.render("login");
};
exports.signupPage = (req, res) => {
  res.render("signup");
};
