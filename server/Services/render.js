exports.homeRoutes = (req, res) => {
  res.render("index");
};

exports.viewRoutes = (req, res) => {
  res.render("view_employee");
};
exports.loginRoutes = (req, res) => {
  res.render("login");
};
exports.signupRoutes = (req, res) => {
  res.render("signup");
};
