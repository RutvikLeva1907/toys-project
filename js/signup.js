document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("signup-username").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    let newUser = { username, email, password };

    fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        alert("Signup successful!");
        window.location.href = "../pages/login.html";
    })
    .catch(error => console.error("Error:", error));
});
