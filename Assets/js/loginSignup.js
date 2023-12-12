async function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    var newreg = {
        name: name,   
        email: email,
        password: password
    };

    console.log('Request Payload:', JSON.stringify(newreg));

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newreg)
        });

        if (!response.ok) {
            // console.log("hi");
            document.getElementById("errorName").style.display = "flex";
        
           
        } else {
            window.location.href = "/login";
        }
    } catch (error) {
        console.log(error);

    }
}

// -------***LOGIN***----------
async function login() {
    const name = document.getElementById("name").value;
    // const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    var loginData = {
        name: name,  
        // email: email,
        password: password
    };

    console.log('Request Payload:', JSON.stringify(loginData));

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
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
