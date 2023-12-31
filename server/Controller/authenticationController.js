var collection = require("../Model/userModel");
const bcrypt = require("bcrypt");

// --------***signup***-----------
exports.signup = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const minPasswordLength = 6; //min pwd lngth
  if (data.password.length < minPasswordLength) {
    return res.status(400).json("Password must be at least " + minPasswordLength + " characters long");
  }

  //to find duplicate user  

  const existingUser = await collection.findOne({ email: data.email });
  if (existingUser) {
    return res.status(401).send("already found");

  } else
    try {
      //using bcrypt
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      data.password = hashedPassword;
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
    const check = await collection.findOne({ email: req.body.email });

    // check username
    if (!check) {
      return res.status(502).send("Check Your Email or Password");
    }

    // check password matching
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (isPasswordMatch) {
      // user session setting
      req.session.user = check;
      res.redirect("/");
    } else {
      return res.status(502).send("Check Your Email or Password");
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
    }
    res.redirect("/");
  });
};
