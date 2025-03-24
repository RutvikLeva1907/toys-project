document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    fetch("http://localhost:5000/users")
    .then(response => response.json())
    .then(users => {
        let validUser = users.find(user => user.email === email && user.password === password);
        
        if (validUser) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", JSON.stringify(validUser));
            window.location.href = "home.html";
        }
        else if(users.email != email){
            alert("Invalid email! ");
        } 
        else if(users.password != password){
            alert("Invalid password! ");
        } 
        else {
            alert("Invalid email or password!");
        }
    })
    .catch(error => console.error("Error:", error));
});
