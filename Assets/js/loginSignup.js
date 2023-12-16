
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

  console.log("Request Payload:", JSON.stringify(newreg));

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
        // console.log("401");
        let errorName401 = document.querySelector("#errorName");
        errorName401.style.display = "flex";
        errorName401.innerHTML = "Email Already Exist";
        break;
    
      case 400:
        // console.log("400");
        let errorName400 = document.querySelector("#errorName");
        errorName400.style.display = "flex";
        errorName400.innerHTML = "Min 6 character required";
        break;
    
      
        default:
        window.location.href = "/login";
    }
  }
catch (error ){
  console.log(error);
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

  console.log("Request Payload:", JSON.stringify(loginData));

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      // console.log("hi");
      document.getElementById("errorNameLog").style.display = "flex";
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
}

