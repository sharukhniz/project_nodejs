var collection = require("../Model/authentication");
const bcrypt = require("bcrypt");


// --------***signup***-----------
exports.signup = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  //duplicate user

  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.render("signup", {
      errorMessage: "*UserID already exist",
    });
  } else
    try {
      //bcrypt
      const saltRounds = 10; //number of salt round for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword; //Replace the hash password with original password
      const userData = await collection.insertMany(data);
      req.session.user = userData;
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering user");
    }
};
// --------***login***--------------
exports.login = async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    // check username
    if (!check) {
      return res.render("login", {
        errorMessage: "*Invalid username or password?",
      });
    }

    // password matching
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (isPasswordMatch) {
      // user session setting
      req.session.user = check;
      res.redirect("/");
    } else {
      return res.render("login", {
        errorMessage: "*Invalid username or password?",
      });
    }
  } catch (error) {
    return res.render("login", {
      errorMessage: "Error processing your request",
    });
  }
};

// ---------***logout***-------------
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};
