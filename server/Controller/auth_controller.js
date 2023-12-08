var collection = require("../Model/authentication");
const bcrypt = require("bcrypt");

// create and save new employee
// exports.signup = (req, res) => {
//   console.log("hello");
//   const data = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   const userData = collection.insertMany(data);
//   console.log(userData);
//   res.redirect("/login");
// };
exports.signup = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  //check the user already exist

  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.render("signup", {
      errorMessage: "*UserID already exist",
    });
  } else
    try {
      //hash the password using bcrypt
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

exports.login = async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    // Check if the username is not found
    if (!check) {
      return res.render("login", {
        errorMessage: "*Invalid username or password?",
      });
    }

    // Compare the password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (isPasswordMatch) {
      // Set the user session upon successful login
      req.session.user = check;
      res.redirect("/");
  }  else {
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
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.log(err)
      }
      res.redirect("/")
  });
}