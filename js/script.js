document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/products") // db.json se product data fetch karega
        .then(response => response.json())
        .then(products => {
            let productList = document.getElementById("home-product-list");
            productList.innerHTML = ""; // Purana data clear karo

            products.forEach(product => {
                let productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    ${product.sale ? '<span class="sale-badge">SALE</span>' : ''}
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-pricing">
                        <span class="old-price">₹${product.old_price}</span>
                        <span class="new-price">₹${product.new_price}</span>
                        <span class="discount">Save ₹${product.old_price - product.new_price}</span>
                    </p>
                `;

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error:", error));
});
