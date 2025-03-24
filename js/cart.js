document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const checkoutBtn = document.getElementById("checkout-btn");
    // login 
    const loginPopup = document.getElementById("login-popup");
    const closePopup = document.getElementById("close-popup");

    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            let cartItem = document.createElement("div");
            cartItem.classList.add("flex", "items-center", "justify-between", "p-4", "border", "rounded-lg");

            cartItem.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded">
                    <div>
                        <p class="font-semibold">${item.name}</p>
                        <p class="text-gray-500 text-sm">Price: ₹${item.price}</p>
                    </div>
                </div>

                <div class="flex items-center space-x-2">
                    <button class="bg-gray-300 px-2 py-1 rounded decrease-btn" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="bg-gray-300 px-2 py-1 rounded increase-btn" data-index="${index}">+</button>
                </div>

                <p class="font-semibold">₹${itemTotal}</p>
                <button class="text-red-500 remove-btn" data-index="${index}">❌</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Increase Quantity
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("increase-btn")) {
            let index = e.target.dataset.index;
            cart[index].quantity++;
            updateCartUI();
        }
    });

    // Decrease Quantity
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("decrease-btn")) {
            let index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            updateCartUI();
        }
    });

    // Remove Item
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            let index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCartUI();
        }
    });

     
    // ✅ Cart Data from LocalStorage
    let carts = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ Function to check if user is logged in
    function isUserLoggedIn() {
        return localStorage.getItem("loggedInUser") !== null;
    }

    // ✅ Checkout Button Click Event
    checkoutBtn.addEventListener("click", () => {
        if (carts.length === 0) {
            alert("❌ Your cart is empty! Please add products before placing an order.");
            return; // 🛑 Order will not proceed
        }

        if (isUserLoggedIn()) {
            alert("✅ Order Placed Successfully!");
            localStorage.removeItem("cart"); // ✅ Clear cart after order
            window.location.href = "/pages/order-success.html"; // 🔹 Redirect to success page
        } else {
            // 🔹 Show login popup if not logged in
            loginPopup.classList.remove("hidden");
        }
    });

    // ✅ Close Popup Button
    closePopup.addEventListener("click", () => {
        loginPopup.classList.add("hidden");
    });
    

    updateCartUI();
});
