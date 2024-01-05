
// -----***SIGNUP***-----

async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;



  var newreg = {
    name: name,
    email: email,
    password: password,
  };


  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newreg),
    });

    switch (response.status) {
      case 401:
        let errorName401 = document.querySelector("#errorName");
        errorName401.style.display = "flex";
        errorName401.innerHTML = "Email Already Exist";
        break;
    
      case 400:
        let errorName400 = document.querySelector("#errorName");
        errorName400.style.display = "flex";
        errorName400.innerHTML = "Min 6 character required";
        break;
    
      
        default:
        window.location.href = "/login";
    }
  }
catch (error ){
}
}

// -------***LOGIN***----------

async function login() {
  // const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  var loginData = {
    // name: name,
    email: email,
    password: password,
  };


  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      document.getElementById("errorNameLog").style.display = "flex";
    } else {
      window.location.href = "/";
    }
  } catch (error) {
  }
}



document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("loginForm");

  form.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          event.preventDefault(); 
          login(); 
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("signupForm");

  form.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
          event.preventDefault(); 
          signup();
      }
  });
});