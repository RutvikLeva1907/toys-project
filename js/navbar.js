 
 document.addEventListener("DOMContentLoaded", () => {
    let authLink = document.getElementById("auth-link"); // Desktop ke liye
    let mobileAuthLink = document.getElementById("mobile-auth-link"); // Mobile ke liye
    let userData = JSON.parse(localStorage.getItem("loggedInUser"));

    if (authLink && mobileAuthLink) {
        if (userData) {
            //If user is logged in, show Logout (Desktop & Mobile)
            authLink.innerHTML = `<button id="logout-btn" class="bg-red-500 px-3 py-1 rounded text-white">Logout</button>`;
            mobileAuthLink.innerHTML = `<button id="mobile-logout-btn" class="bg-red-500 px-3 py-1 rounded text-white">Logout</button>`;

            //Logout Functionality (Desktop)
            document.getElementById("logout-btn").addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                alert("You have been logged out!");
                window.location.reload();
            });

            //Logout Functionality (Mobile)
            document.getElementById("mobile-logout-btn").addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                alert("You have been logged out!");
                window.location.reload();
            });

        } else {
            //If user is not logged in, show Login (Desktop & Mobile)
            authLink.innerHTML = `<a href="/pages/login.html" class="hover:text-yellow-400">Login</a>`;
            mobileAuthLink.innerHTML = `<a href="/pages/login.html" class="block hover:text-yellow-400">Login</a>`;
        }
    }

    //Mobile Menu Toggle
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
});
