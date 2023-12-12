async function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    var newreg = {
        name: name,  // Fix: Change 'username' to 'name'
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

        if (response.ok) {
            alert('Account created successfully');
            window.location.href = "/login";
        } else {
            const err = await response.json();
            // console.error('Error:', err.errorMessage);
            alert('Error creating account: ' + err.errorMessage);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error. Please try again.');
    }
}
