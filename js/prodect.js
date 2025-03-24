document.addEventListener("DOMContentLoaded", () => {
    const homeProductList = document.getElementById("home-product-list");
    const productPageList = document.getElementById("product-page-list");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");


    let allProducts = [];

    fetch("http://localhost:5000/products")
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            if (homeProductList) displayProducts(products.slice(0, 9), homeProductList);
            if (productPageList) displayProducts(products, productPageList);
        })
        .catch(error => console.error("❌ Error fetching products:", error));

    function displayProducts(products, container) {
        container.innerHTML = "";
        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("relative", "bg-white", "p-4", "rounded-lg", "shadow-lg", "hover:shadow-xl", "transition");

            productCard.innerHTML = `
                <div class="relative">
                    ${product.sale ? '<span class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">SALE</span>' : ''}
                    <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded-md">
                    <h2 class="text-lg font-semibold mt-2">${product.name}</h2>
                    <p class="text-gray-700 mt-1">
                        <span class="text-sm line-through text-gray-400">₹${product.mrp_price}</span>
                        <span class="text-lg font-bold text-red-500">₹${product.dp_price}</span>
                        <span class="text-sm text-green-600">Save ₹${product.mrp_price - product.dp_price}</span>
                    </p>
                    <button class="add-to-cart bg-yellow-500 text-white px-4 py-2 rounded mt-2 w-full" 
                        data-id="${product.id}" data-name="${product.name}" 
                        data-price="${product.dp_price}" data-image="${product.image}">
                        Add to Cart 🛒
                    </button>
                </div>
            `;

            container.appendChild(productCard);
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", addToCart);
        });

    }

    function addToCart(event) {
        let button = event.target;
        let productId = button.getAttribute("data-id");
        let productName = button.getAttribute("data-name");
        let productPrice = button.getAttribute("data-price");
        let productImage = button.getAttribute("data-image");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, image: productImage, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${productName} added to cart!`);
    }

    function filterProducts() {
        let searchText = searchInput.value.toLowerCase();
        let selectedCategory = categoryFilter.value;
        let selectedPriceSort = priceFilter.value;
    
        let filteredProducts = allProducts.filter(product => {
            let matchesSearch = product.name.toLowerCase().includes(searchText);
            let matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    
        // ✅ Price Sorting (Low to High / High to Low)
        if (selectedPriceSort === "low-to-high") {
            filteredProducts.sort((a, b) => a.dp_price - b.dp_price);
        } else if (selectedPriceSort === "high-to-low") {
            filteredProducts.sort((a, b) => b.dp_price - a.dp_price);
        }

        if (homeProductList) displayProducts(filteredProducts.slice(0, 9), homeProductList);
        if (productPageList) displayProducts(filteredProducts.slice(0, 9), productPageList);
    }

    if (searchInput) searchInput.addEventListener("input", filterProducts);
    if (categoryFilter) categoryFilter.addEventListener("change", filterProducts);
    if (priceFilter) priceFilter.addEventListener("change", filterProducts);
});
